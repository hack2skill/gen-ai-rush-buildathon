from functions import functions_bq
from prompts import PROMPT_ANALYTICS
from google.cloud import bigquery
import openai
import json
import logging
from utils import num_tokens_from_messages
logger = logging.getLogger(__name__)
def result_to_string(result):
    # Convert each row in the result to a dictionary and store them in a list
    rows = [dict(row) for row in result]

    # Convert the list of dictionaries to a string
    result_string = str(rows)

    return result_string

def execute_query(args):
    query = args['query']
    print("executing query")
    print(query)
    # query += " LIMIT 10"
    client = bigquery.Client()
    
    try:
        query_job = client.query(query)
        results = query_job.result()
        result_string = result_to_string(results)
        # if len(result_string)>2000:
        #     print("length more than 2000")
        #     return result_string[:2000]
        return result_string
    except Exception as e:
        print('error')
        print(e)
        return f"An error occurred: {e}"
available_functions = {
    "execute_bigquery_query": execute_query
}
def get_analytics_data(args, model='gpt-4'):
    question = args['question']
    print('asking question')
    print(question)
    messages_analytics=[
        {"role": "system", "content": PROMPT_ANALYTICS},
        {"role": "user", "content": question}
    ]
    # Step 1: send the conversation and available functions to GPT
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages_analytics,
        functions=functions_bq,
        function_call={"name":"execute_bigquery_query"},
        temperature=0  # auto is default, but we'll be explicit
    )
    response_message = response["choices"][0]["message"]

    # Step 2: check if GPT wanted to call a function
    iterations = 0
    while response_message.get("function_call"):
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        
        function_name = response_message["function_call"]["name"]
        fuction_to_call = available_functions[function_name]
        # print('calling', fuction_to_call)
        function_args = json.loads(response_message["function_call"]["arguments"])
        # print('arguments')
        # print(function_args)
        function_response = fuction_to_call(function_args)

        # Step 4: send the info on the function call and function response to GPT
        messages_analytics.append(response_message)  # extend conversation with assistant's reply
        messages_analytics.append(
            {
                "role": "function",
                "name": function_name,
                "content": function_response,
            }
        )  # extend conversation with function response
        numTokens = num_tokens_from_messages(messages_analytics, model)
        print("numtokens")
        print(numTokens)
        logger.info(f'tokens: {numTokens}')
        if numTokens > 8000:
            logger.error('tokens surpassed')
            print("tokens surpassed")
            messages_analytics.pop()
            messages_analytics.append(
            {
                "role": "function",
                "name": function_name,
                "content": "Function response too long. Returning just first 2000 characters of it: "+function_response[:2000],
            }
        )
        if iterations<1:
            response = openai.ChatCompletion.create(
                model='gpt-4',
                messages=messages_analytics,
                functions=functions_bq,
                function_call="auto",
                temperature=0
            )  # get a new response from GPT where it can see the function response
            response_message = response["choices"][0]["message"]
            # messages.append(response_message)
            # print(response_message)
            # messages_analytics.append(response_message)
            iterations += 1
        else:
            response = openai.ChatCompletion.create(
                model='gpt-4',
                messages=messages_analytics,
                # functions=functions,
                # function_call="auto",
                temperature=0
            )  # get a new response from GPT where it can see the function response
            response_message = response["choices"][0]["message"]
            break

    messages_analytics.append(response_message)
    print("analytics responding with")
    print(response_message)
    return messages_analytics[-1]['content']
    
    
