import openai
from functions import functions_workflow
from comm import send_email
from binfo import get_business_contextual_information
from bqagent import get_analytics_data
import json
available_functions = {
    "send_email": send_email,
    "get_business_contextual_information": get_business_contextual_information,
    "get_analytics_data": get_analytics_data,
}

def run_workflow(messages, model= 'gpt-4'):
    # Step 1: send the conversation and available functions to GPT
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        functions=functions_workflow,
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
        if iterations<2:
                
            response = openai.ChatCompletion.create(
                model=model,
                messages=messages,
                functions=functions_workflow,
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