import requests
import json
import openai
from tidb.apis import get_token_for_team,give_user_chats
from slack_app.views import make_payload_message
# openai.api_key = ###
from llama_index.llms import OpenAI




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
    



def merge_chat_text(chats):
    return "\n\n".join([i['text'] for i in chats])



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
def send_daily_digest(user_id):
    # Print out the data from Pub/Sub, to prove that it worked
    print("sending message")
    print("user",user_id)
    chats,choice_objects= give_user_chats(user_id)
    
    if len(chats)>0:
        merged_chats=merge_chat_text(chats)
        action_ = action_planner(merged_chats)
        summary = summarizer(merged_chats)
        print(send_summary_user(choice_objects=choice_objects ,summary=summary,action_plan=action_)) # add the summary here 
        print('***'*10)