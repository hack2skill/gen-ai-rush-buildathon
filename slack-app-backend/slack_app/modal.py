import json
import requests
from tidb.apis import get_token_for_user

modal_open_url  =    'https://slack.com/api/views.open'

def openModal(trigger_id,user):
    TOKEN = get_token_for_user(user)
    headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {TOKEN}'
            }
    payload = {
        "trigger_id": trigger_id,
        "view": {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "Briefly"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit"
            },
            "blocks": [
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Name of your daily digest"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": " "
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "multi_channels_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Search for channels"
                        },
                        "action_id": "multi_channels_select-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Select channels"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": " "
                    }
                }
            ]
        }
    }
    response = requests.post(modal_open_url, headers=headers, data=json.dumps(payload))

