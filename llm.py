import os
import openai
import json

def get_resolution(program,tracemsg, tldr=False):
  # Load the API key from the JSON file
  with open('config.json') as f:
      config = json.load(f)
      openai.api_key = config["OPENAI_API_KEY"]
  prompt = """You are an AI-powered error diagnosis and solution tool. Your purpose is to analyze the output of programs and provide helpful suggestions to fix errors. When a user provides you with the output generated by a program, you intelligently examine the content for any errors, and then, in simple and understandable terms, explain the detected error to the user. Always give references.
  Template:
  Explanation: <explanation>
  Code/Fix: ```<full code/fix>```
  References: <references>
  """
  if tldr:
      prompt += " Return only one line explanation along with the code snippet or fix. If returning the code snippet, return with proper formatting with ``` "
  # Your existing code
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
      {
        "role": "system",
        "content": prompt
      },
      {
        "role": "user",
        "content": "Error: "+tracemsg+" \n Context: \n"+program
      }
    ],
    temperature=0,
    max_tokens=1024
  )

  # Process and print the API response
  if 'choices' in response and len(response['choices']) > 0:
      chat_result = response['choices'][0]['message']['content']
    #   print("Resolution:")
    #   print(chat_result)
      return "Resolution: "+chat_result
  else:
      return "No response or error occurred."

