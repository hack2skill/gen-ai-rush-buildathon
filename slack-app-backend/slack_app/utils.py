add_new_digest_button=[{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Add new digest"
					},
					"value": "click_me_123"
				}
			]
}]

def create_block_input(digest_list):
    main_list=[]
    for data in digest_list:
        channel_string=''
        for i in data['channels'].split('|'):
            channel_string=channel_string+f'<#{i}> '

        main_object=[{"type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*{data['digest_name']}*\n Total Messages:100\n Daily average:10 \n Time saved:\nSubscriber <@{data['user_id']}>\nChannels included: {channel_string}"
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Delete"
                    },
                    "style":'danger',
                    "value": f"delete_{data['id']}"
                }
            },
            {
                "type": "divider"
            } ]
        main_list=main_list+main_object
    return main_list+add_new_digest_button