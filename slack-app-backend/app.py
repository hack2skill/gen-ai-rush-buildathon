import json
from utils import get_value_from_payload
from flask import Flask, request, jsonify
from slack_app.api import display_home,modalAPI,exchangeToken,seeAllDigestAPI
from tidb.apis import (insert_new_datapoint,register_authenticated_user,delete_digest,add_message)
from send_digest import send_daily_digest


app = Flask(__name__)

@app.route('/slack/events', methods=['POST'])
def slack_events():
    # print(request)
    req = request.get_json()
    event_type = req['type']
    if event_type == 'url_verification':
        # verify Events API endpoint by returning challenge if present
        return jsonify({'challenge': req['challenge']})

    elif event_type == 'event_callback':
        
        event = req['event']
        event_type = event['type']
        # print(event)
        # Triggered when the App Home is opened by a user
        if event_type == 'app_home_opened':
            user = event['user']
            team_id = req['team_id']
            # Display App Home
            display_home(user,team_id)
        if event_type=='message':
            add_message(event)
    return '', 200


@app.route("/slack/actions", methods=["POST"])
def slack_actions():
    payload = json.loads(request.form['payload'])
    trigger_id = payload["trigger_id"]
    user = payload["user"]['id']
    event_type = payload["type"]
    team_id = payload['user']['team_id']
    # print(payload)
    if event_type == 'view_submission':
        data={}
        user = payload['user']['id']
        data['digest_name'] = get_value_from_payload(payload['view']['state']['values'])
        data['channels'] = "|".join(get_value_from_payload(payload['view']['state']['values'],'multi_channels_select-action','selected_channels'))
        data['domain']= payload['team']['domain']
        data['username']=payload['user']['username']
        data['user_id']=payload['user']['id']
        data['team_id']=payload['user']['team_id']
        result = insert_new_datapoint(data)
        # print(result)
        display_home(user,team_id=team_id)

        return {
            "response_action": "clear"
        }
    
    elif payload["actions"] and payload["actions"][0]["value"].startswith("click_me_123"):
        modalAPI(trigger_id,user,team_id)

    elif payload["actions"] and payload["actions"][0]["value"].startswith("show_digest"):
        seeAllDigestAPI(trigger_id,user,team_id)
        

    elif payload["actions"] and payload["actions"][0]["value"].startswith("go_back"):
        display_home(user,team_id)

    elif payload["actions"] and payload["actions"][0]["value"].startswith("delete"):
        delete_digest(payload["actions"][0]["value"].split('_')[-1])
        seeAllDigestAPI(trigger_id,user,team_id)

    elif payload["actions"] and payload["actions"][0]["value"].startswith("instant"):
        send_daily_digest(user)

    print(payload["actions"][0]["value"])
    return '', 200


@app.route('/slack/register', methods=['GET'])
def authenticate_url():
    print("hit")
    code = request.args.get('code')
    response  = exchangeToken(code=code)
    
    # print('response')
    data = {
            'ok': response['ok'],
            'app_id': response['app_id'],
            'authed_user_id': response['authed_user']['id'],
            'scope': response['scope'],
            'token_type': response['token_type'],
            'access_token': response['access_token'],
            'bot_user_id': response['bot_user_id'],
            'team_id': response['team']['id'],
            'team_name': response['team']['name'],
            'enterprise': str(response['enterprise']).lower(),
            'is_enterprise_install': response['is_enterprise_install']
            }
    register_authenticated_user(data)
    return {"response":200}


if __name__ == '__main__':
    app.run(debug=True,port=8080,host='0.0.0.0')

