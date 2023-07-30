from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
app = Flask(__name__)
CORS(app)

# OpenAI API key
# Either direclty set or fetch it from environment variable

load_dotenv(find_dotenv())
openai.api_key = os.environ.get("OPENAI_API_KEY")


@app.route('/incog')
def index():
  return 'Hello from Flask!'


@app.route('/api', methods=['POST'])
def api():
  try:
    if not request.json or 'userPrompt' not in request.json:
      raise ValueError(
        "Request body must be JSON and include a 'userPrompt' key")

    user_prompt = request.json['userPrompt']

    # First OpenAI API call
    # Note: This Redaction of API call is supposed to be done server running on local system. 
    # We had difficuly setting up local models on our system. So for demo sake we are using OpenAI API.
    private_prompt = openai.ChatCompletion.create(
      model=
      "gpt-4",  # replace this with the correct model name for GPT-4 when it becomes available
      messages=[
        {
          "role":
          "system",
          "content":"Remove any personal information from the prompt like name, address, location, organisation name, age. Dont remove that information which is necessary for the prompt to make sense."
        },
        {
          "role": "user",
          "content": user_prompt
        },
      ])

    first_response = private_prompt['choices'][0]['message']['content']

    # Second OpenAI API call
    response = openai.ChatCompletion.create(model="gpt-4",
                                            messages=[
                                              {
                                                "role": "user",
                                                "content": first_response
                                              },
                                            ])

    final_response = response['choices'][0]['message']['content']

    return jsonify(infoData=first_response, chatData=final_response)

  except Exception as e:
    # Log the error and return a 500 response
    print(str(e))
    app.logger.error(f"An error occurred: {str(e)}")
    return jsonify(error=str(e)), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
