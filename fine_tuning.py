import openai
import time

# Enter your api key (enter your own key here. The below key is invalid)
openai.api_key = "OPENAI_API_KEY"

# Define the model and parameters
model_engine = "curie"
prompt = ""

# Main loop
while True:
    try:
        # Get user input
        user_input = input("> ")

        # Send user input to OpenAI API
        response = openai.Completion.create(
            engine=model_engine,
            prompt=prompt + "\nUser: " + user_input + "\nBot:",
            max_tokens=20,
            n=1,
            stop=None,
            temperature=0.5,
        )

        # Extract bot response from OpenAI API response
        bot_response = response.choices[0].text.strip()
        bot_response = bot_response.split('\n')[0]

        # Print bot response
        print("Bot: " + bot_response)

        # Add bot response to prompt for next iteration
        prompt += "\nUser: " + user_input + "\nBot: " + bot_response
    
    except KeyboardInterrupt:
        print("Interrupted by user")
        break