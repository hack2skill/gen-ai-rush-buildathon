from tidb.apis import check_if_user_has_digest
from slack_app.utils import create_block_input

def update_view(user):

    m = check_if_user_has_digest(user)

    user_present =  len(m)>0
    action_block = {}
    print('user_present',user_present)
    if user_present==False:
        action_block = {
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"emoji": True,
						"text": "Setup daily digest"
					},
					"style": "primary",
					"value": "click_me_123"
				}
			]
		}
    else:
        action_block={
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You have already signed up for digest"
                }
            }


    payload = {
    "user_id": user,
    "view": {
	"type": "home",
	"blocks": [
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": ":wave: Welcome to Briefly"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Briefly streamlines Slack conversations by offering hassle-free context without the need to read lengthy threads. You can schedule automatic summarization for both threads and channels or request on-demand summaries :rocket:"
			}
		},
		{
			"type": "image",
			"title": {
				"type": "plain_text",
				"text": " "
			},
			"image_url": "https://www.protocol.com/media-library/slack-s-internal-workflows-all-point-to-how-the-company-itself-uses-its-offerings-to-prioritize-actions-over-words.jpg?id=24787612&width=1245&height=700&quality=85&coordinates=36%2C0%2C37%2C0",
			"alt_text": "image1"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Briefly sends you private daily summaries of the channels you select"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Setup daily digest"
					},
					"style": "primary",
					"value": "click_me_123"
				},
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "See all digests"
					},
					"value": "show_digest"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": " "
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
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": ":fire: Get your digest for today"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": " The purpose of this button is to allow users to instantly receive the daily digest at any time they desire, in addition to the scheduled delivery. When users click on the button, "
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Get Instant Digest"
					},
					"style": "primary",
					"value": "instant_summary_123"
				}
			]
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": ":zap: Built with TiDB"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "image",
					"image_url": "https://avatars.githubusercontent.com/u/58058301?s=280&v=4",
					"alt_text": "cute cat"
				},
				{
					"type": "mrkdwn",
					"text": "*Tidb* an open-source distributed SQL database supporting HTAP workloads"
				}
			]
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Briefly is built with TiDB Serverless, a fully-managed, MySQL-compatible, database service on AWS, Equipped to create scalable, resilient, and high-performing applications.  :rocket:"
			}
		}
	]
    }
    }
    
    return payload



def view_all_digest(user):

    m = check_if_user_has_digest(user)
    user_present =  len(m)>0

    payload = {
    "user_id": user,
    "view": {
	"type": "home",
	"blocks": [
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "⬅️  Go Back",
						"emoji": True
					},
					"value": "go_back"
				}
			]
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "All digests you are subscribed to"
			}
		},
		{
			"type": "divider"
		}
        ]+ create_block_input(check_if_user_has_digest(user))
        }
    }
    
    return payload


def modalView(user):
    payload = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Briefly",
		"emoji": True
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": True
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": True
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
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Time when you want to recieve digest*"
			},
			"accessory": {
				"type": "timepicker",
				"initial_time": "13:37",
				"placeholder": {
					"type": "plain_text",
					"text": "Select time",
					"emoji": True
				},
				"action_id": "timepicker-action"
			}
		}
	]
}
    return payload



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
