import uuid
from typing import List
import pymysql.cursors
from pymysql import Connection
from pymysql.cursors import DictCursor

connection =pymysql.connect(host="gateway01.eu-central-1.prod.aws.tidbcloud.com",
                   port=4000,
                   user="22k5BU12AkmKkZV.root",
                   password="6svLgAi5frYcdHcc",
                   database='slack',
                   cursorclass=DictCursor,
                   autocommit=True,
                   ssl={
                      "ca": "/etc/ssl/cert.pem"
                      })


def is_connected():
    try:
        connection.ping()
        return True
    except pymysql.err.OperationalError:
        return False


def check_if_user_has_digest(user_id):
    is_connected()
    query = f""" SELECT * FROM user_choices WHERE user_id = '{user_id}' """
    with connection.cursor() as cursor:
        cursor.execute(query)
        m = cursor.fetchall()
        return m
    

def insert_new_datapoint(data):
    is_connected()
    QUERY =f"""
    INSERT INTO user_choices (digest_name, channels, domain, username, team_id, user_id)
    VALUES ('{data['digest_name']}', '{data['channels']}', '{data['domain']}',' {data['username']}', '{data['team_id']}', '{data['user_id']}' );
    """
    print(QUERY)
    with connection.cursor() as cursor:
        cursor.execute(QUERY)
    return 200


def register_authenticated_user(data):
    is_connected()
    QUERY = f"""
    INSERT INTO authenticated_user (app_id, authed_user_id, scope, token_type, access_token, bot_user_id, team_id, team_name, enterprise, is_enterprise_install)
    VALUES ('{data['app_id']}', '{data['authed_user_id']}', '{data['scope']}', '{data['token_type']}', '{data['access_token']}', '{data['bot_user_id']}', '{data['team_id']}', '{data['team_name']}', '{data['enterprise']}', {data['is_enterprise_install']});
    """
    with connection.cursor() as cursor:
            cursor.execute(QUERY)
            m = cursor.fetchall()

    return m


def get_token_for_user(team_id):
    is_connected()
    query = f""" SELECT access_token from slack.authenticated_user WHERE team_id = '{team_id}' """
    with connection.cursor() as cursor:
        cursor.execute(query)
        m = cursor.fetchall()
    if len(m)>0:
        return m[0]['access_token']
    else:
        return None
    
def delete_digest(id_):
    is_connected()
    QUERY=f"DELETE FROM slack.user_choices WHERE id = {id_}"
    with connection.cursor() as cursor:
            cursor.execute(QUERY)
            m = cursor.fetchall()
    return True

def add_message(data):
    is_connected()
    QUERY = f"""
    INSERT INTO messages (client_msg_id, type, text, user, ts, team, channel, event_ts, channel_type)
    VALUES ('{data['client_msg_id']}', '{data['type']}', "{data['text']}", '{data['user']}', '{data['ts']}', '{data['team']}', '{data['channel']}', '{data['event_ts']}', '{data['channel_type']}');
    """
    print("adding message")
    with connection.cursor() as cursor:
        cursor.execute(QUERY)
        m = cursor.fetchall()
    return m


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
    

def give_user_chats(user_id):
    is_connected()
    query_get_users=f"SELECT * from slack.user_choices where user_id = '{user_id}'"
    with connection.cursor() as cursor:
        cursor.execute(query_get_users)
        m = cursor.fetchall()

    choice_objects= m[0]
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
    return m,choice_objects