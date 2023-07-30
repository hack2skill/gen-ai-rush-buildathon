from flask import Flask, request, jsonify
import json
import openai
import os
from flask_cors import CORS
from google.cloud import bigquery
import tiktoken
import logging
from comm import send_email
from bqagent import get_analytics_data
from binfo import get_business_contextual_information
from workflow import run_workflow
logger = logging.getLogger(__name__)
# Create formatters and add it to handlers
# c_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
# f_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# os.environ['GOOGLE_APPLICATION_CREDENTIALS']='/Users/akshatkhare/Downloads/eco-diode-390704-7c336c27e971.json'
# Initialize the Flask application
app = Flask(__name__)
CORS(app)

from prompts import PROMPT, PROMPT_ANALYTICS, PROMPTS_WORKFLOW
from functions import functions
# Initialize a global messages list

messages = [ {'role':'system', 'content':PROMPT} ]

# health check route
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

# basic route
@app.route('/', methods=['GET'])
def main():
    return 'OK', 200
workflows = set()
def saveWorkflow(args):
    description = args['ask']
    workflows.add(description)
    return "Workflow saved successfully"
def executeWorkflow(args):
    print('executing workflows')
    print(workflows)
    responses = []
    if len(workflows)==0:
        return "No workflows available"
    for w in workflows:
      messages_workflow = [ {'role':'system', 'content':PROMPTS_WORKFLOW} ]
      messages_workflow.append({'role':'user', 'content':w})
      response = run_workflow(messages=messages_workflow, model='gpt-4')
      responses.append(response)
    return "Workflow executed successfully"
# Declare your available functions
available_functions = {
    "send_email": send_email,
    "get_business_contextual_information": get_business_contextual_information,
    "get_analytics_data": get_analytics_data,
    "save_workflow": saveWorkflow,
    "execute_workflow":executeWorkflow
}


def run_conversation_w(messages, model= 'gpt-4'):
    # Step 1: send the conversation and available functions to GPT
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        functions=functions,
        function_call="auto",
        temperature=0  # auto is default, but we'll be explicit
    )
    response_message = response["choices"][0]["message"]

    # Step 2: check if GPT wanted to call a function
    iterations = 0
    while response_message.get("function_call"):
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        print("iteration run w")
        print(iterations)
        function_name = response_message["function_call"]["name"]
        fuction_to_call = available_functions[function_name]
        # print('calling', fuction_to_call)
        function_args = json.loads(response_message["function_call"]["arguments"])
        # print('arguments')
        # print(function_args)
        function_response = fuction_to_call(function_args)

        # Step 4: send the info on the function call and function response to GPT
        messages.append(response_message)  # extend conversation with assistant's reply
        messages.append(
            {
                "role": "function",
                "name": function_name,
                "content": function_response,
            }
        )  # extend conversation with function response
        if iterations<0:
                
            response = openai.ChatCompletion.create(
                model=model,
                messages=messages,
                functions=functions,
                function_call="auto",
                temperature=0
            )  # get a new response from GPT where it can see the function response
            response_message = response["choices"][0]["message"]
            # messages.append(response_message)
            # print(response_message)
            # messages.append(response_message)
            iterations += 1
        else:
            response = openai.ChatCompletion.create(
                model=model,
                messages=messages,
                # functions=functions,
                # function_call="auto",
                temperature=0
            )  # get a new response from GPT where it can see the function response
            response_message = response["choices"][0]["message"]
            break

    messages.append(response_message)
    return messages

# print(run_conversation())

@app.route('/reset', methods=['GET'])
def reset():
    global messages, workflows
    messages = [ {'role':'system', 'content':PROMPT} ]
    workflows = set()
    return jsonify({'status': 'success', 'message': 'Conversation reset successfully.'}), 200


@app.route('/run_conversation', methods=['POST'])
def run_conversation_api():
    # Expect a JSON body with the message and model
    data = request.get_json()

    # Ensure the required fields are provided
    if 'message' not in data or 'model' not in data:
        return jsonify({'error': 'Missing required field(s)'}), 400

    # Keep track of the original length of the messages list
    orig_length = len(messages)

    # Append the incoming message to the global messages list
    messages.append({
        'role': 'user',
        'content': data['message']
    })

    # Run the conversation
    response = run_conversation_w(messages, model=data['model'])

    # Extract function calls and their responses
    function_calls = [
        {
            'function_call': message['function_call'],
            'response': next((msg['content'] for msg in response[i+1:] if msg['role'] == 'function' and msg['name'] == message['function_call']['name']), None)
        } 
        for i, message in enumerate(response[orig_length:], start=orig_length) if message.get('function_call')
    ]

    # Return the last response from the assistant and function call information
    return jsonify({
        'primary_response': response[-1],
        'function_calls': function_calls
    })

if __name__=="__main__":
    app.run(port=5000, host='0.0.0.0')