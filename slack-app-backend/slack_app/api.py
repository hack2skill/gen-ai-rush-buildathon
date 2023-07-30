import json
import requests
from tidb.apis import get_token_for_user
from slack_app.views import update_view,modalView,view_all_digest


modal_open_url  =    'https://slack.com/api/views.open'
OAuthURL        =    'https://slack.com/api/oauth.v2.access'
client_id       =    '5572123603442.5572394129795'
client_secret   =    '0f37cdb3c68350946818d00b2b4682dd'
redirect_url    =    'https://theflick.in'
VIEW_PUBLISH_URL=    'https://slack.com/api/views.publish'



def display_home(user,team_id):
    print(user)
    TOKEN = get_token_for_user(team_id)
    print(TOKEN)
    view = update_view(user)
    headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN}'
            }

    response = requests.post(VIEW_PUBLISH_URL, headers=headers, data=json.dumps(view))
    response.raise_for_status()



def modalAPI(trigger_id,user,team_id):
    TOKEN = get_token_for_user(team_id)

    headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN}'
            }
    payload = {
        "trigger_id": trigger_id,
        "view": modalView(user)
    
    }
    
    response = requests.post(modal_open_url, headers=headers, data=json.dumps(payload))

def seeAllDigestAPI(trigger_id,user,team_id):

    TOKEN = get_token_for_user(team_id)
    view = view_all_digest(user)
    headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN}'
            }

    
    response = requests.post(VIEW_PUBLISH_URL, headers=headers, data=json.dumps(view))
    response.raise_for_status()


def exchangeToken(code):
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'redirect_url': redirect_url
    }

    response = requests.post(OAuthURL, data=data)
    response = response.json()
    return response