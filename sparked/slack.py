import os
from slack_bolt import App
from flask import Flask, request, jsonify
from slack_bolt.adapter.flask import SlackRequestHandler
import requests
import json
from flask_cors import CORS

# from config import SLACK_TOKEN, SIGNING_SECRET
SLACK_TOKEN = os.environ.get('SLACK_TOKEN')
SIGNING_SECRET = os.environ.get('SIGNING_SECRET')
STRATEGY_URL = os.environ.get('STRATEGY_URL')

# Initialize a Bolt app
app = App(token=SLACK_TOKEN, signing_secret=SIGNING_SECRET)


def extract_function_names(json_response):
  data = json.loads(json_response)
  function_calls = data.get('function_calls', [])
  function_names = [call['function_call']['name'] for call in function_calls]
  return function_names


def get_response_from_api(text):
  url = f"{STRATEGY_URL}/run_conversation"
  headers = {"Content-Type": "application/json"}
  data = {"message": text, "model": "gpt-4"}
  response = requests.post(url, headers=headers, data=json.dumps(data))
  response_text = response.json()["primary_response"]["content"]
  function_names = extract_function_names(response.content)
  return response_text, function_names


# Define an event listener for "app_mention" events
@app.event("app_mention")
def handle_app_mention(body, say, logger):
  text = body["event"]["text"]
  logger.info(body)
  # Check if the text is the reset command
  if "reset" in text:
    # Call the reset API
    url = f'{STRATEGY_URL}/reset'
    response = requests.get(url)

    # Respond to the command
    if response.status_code == 200:
      say("Conversation reset.")
    else:
      say("Failed to reset conversation.")
  else:
    say("Thinking...", thread_ts=body["event"]["ts"])
    try:
      api_response, function_names = get_response_from_api(text)
      # say(api_response)
      # if function_names:
      #   # reply names of function used in thread of message
      #   say(f"Function used: {', '.join(list(set(function_names)))}",
      #       thread_ts=body["event"]["ts"])
      # Use blocks for better formatting
      blocks = [
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": api_response,
              },
          },
      ]
      say(blocks=blocks)
      if function_names:
        blocksF = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"Function used: {', '.join(list(set(function_names)))}",
                },
            }
        ]
        say(blocks=blocksF, thread_ts=body["event"]["ts"])

      # Update the loading message in the thread with the actual response
      
      
    except Exception as e:
      logger.error(e)
      say("Something went wrong. Please try again.")
      
      try:
        url = f'{STRATEGY_URL}/reset'
        response = requests.get(url)
      except Exception as e:
        logger.error(e)
        say("Failed to reset conversation.")
    


# Initialize a Flask app and a Slack request handler
flask_app = Flask(__name__)
CORS(flask_app)
handler = SlackRequestHandler(app)

# health check route
@flask_app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})
# basic route
@flask_app.route('/', methods=['GET'])
def main():
    return 'OK', 200

# Define a route for handling Slack events
@flask_app.route("/slack/events", methods=["POST"])
def slack_events():
  return handler.handle(request)


if __name__ == "__main__":
  flask_app.run(host="0.0.0.0", port=3000)
