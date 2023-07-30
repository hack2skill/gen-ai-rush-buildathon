import uuid
from typing import List
import pymysql.cursors
from pymysql import Connection
from pymysql.cursors import DictCursor
import requests
import json
import openai
from llama_index.llms import OpenAI

openai.api_key = ### openAPI key


# %%time
connection =pymysql.connect(host="gateway01.eu-central-1.prod.aws.tidbcloud.com",
                   port=4000,
                   user="22k5BU12AkmKkZV.root",
                   password="6svLgAi5frYcdHcc",
                   database='slack',
                   cursorclass=DictCursor,
                   autocommit=True,
                   ssl={
                       "ca": "/etc/ssl/certs/ca-certificates.crt"
                      })

def is_connected():
    try:
        connection.ping()
        return True
    except pymysql.err.OperationalError:
        return False

def get_token_for_team(team_id):
    is_connected()
    query = f""" SELECT access_token from slack.authenticated_user WHERE team_id = '{team_id}' """
    with connection.cursor() as cursor:
        cursor.execute(query)
        m = cursor.fetchall()
    if len(m)>0:
        return m[0]['access_token']
    else:
        return None

def make_payload_message(choice_objects,summary,action_plan):
    channel_strings=""
    
    for k in choice_objects['channels'].split('|'):
        channel_strings = channel_strings+f"<#{k}>"+' '
    
    payload=[
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f" :rolled_up_newspaper: The Digest: {choice_objects['digest_name']}"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text":channel_strings
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"{summary}"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*Action points:* {action_plan}"
                }
            },
            {
                "type": "divider"
            }
        ]
    return payload



def send_summary_user(choice_objects,summary,action_plan):
    # 'U05H6NB0RDX'
    url = "https://slack.com/api/chat.postMessage"
    headers = {
    "Content-type": "application/json",
    "Authorization": f"Bearer {get_token_for_team(choice_objects['team_id'])}"
    }

    payload = {
    "channel" : choice_objects['user_id'],
    "blocks"  : make_payload_message(choice_objects,summary,action_plan)
    }

    response = requests.post(url, headers=headers, data=json.dumps(payload))
    

def give_user_chats(choice_objects):
    is_connected()
    print(choice_objects['digest_name'])
    channels = choice_objects['channels'].split('|')

    channels_str = ','.join(f"'{channel}'" for channel in channels)

    channel_query = f"""
        SELECT text
        FROM slack.messages
        WHERE channel IN ({channels_str})
        AND DATE(FROM_UNIXTIME(ts)) = CURRENT_DATE
        ORDER BY FROM_UNIXTIME(ts) DESC
    """
    with connection.cursor() as cursor:
        cursor.execute(channel_query)
        m = cursor.fetchall()
    return m

def merge_chat_text(chats):
    return "\n\n".join([i['text'] for i in chats])

def check_connection_health():
    if connection.open:
        # do something
        print("connected")
    else:
        connection.ping(reconnect=True)


def action_planner(merged_chats):
    response = openai.Completion.create(
        model="text-davinci-003",
        temperature=0.5,
        max_tokens=1024,
        n = 1,
        stop=None,
        prompt=f"give one liner action plan to this {merged_chats}",
    )
    return response.get('choices')[0].get('text')

def summarizer(merged_chats):
    response=  OpenAI().complete(f"give 3-4 lines summary of below chat with bullet points {merged_chats}")

    return json.loads(response.json())['text']

#### sending summary to everyone 


# Triggered from a message on a Cloud Pub/Sub topic.
def hello_pubsub(cloud_event):
    is_connected()
    query_get_users="SELECT * from slack.user_choices"

    with connection.cursor() as cursor:
        cursor.execute(query_get_users)
        m = cursor.fetchall()
   
    # Print out the data from Pub/Sub, to prove that it worked
    for i in m:
        chats= give_user_chats(i)
        if len(chats)>0:
            merged_chats=merge_chat_text(chats)
            action_ = action_planner(merged_chats)
            summary = summarizer(merged_chats)
            print(send_summary_user(choice_objects=i,summary=summary,action_plan=action_)) # add the summary here 
            print('***'*10)