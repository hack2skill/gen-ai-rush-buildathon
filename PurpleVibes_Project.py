from tkinter import *
import os
import csv
from googleapiclient.discovery import build
from llama_index import VectorStoreIndex, SimpleDirectoryReader
import openai
import time

openai.api_key = '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'

def search_and_share_videos(topic):
    # Set up the YouTube Data API client
    api_key = 'AIzaSyAZqY6J7a4MMI-Q75VVMHxxfZXT5jbQktU'
    youtube = build('youtube', 'v3', developerKey=api_key)

    # Search for videos on YouTube
    request = youtube.search().list(
        part='snippet',
        q=f'{topic} tutorial',
        type='video',
        maxResults=20  # Adjust the number of results as needed
    )
    res = request.execute()

    # Save video details in a CSV file
    csv_file = f'{topic}_videos.csv'
    with open(csv_file, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Title', 'Link', 'Level'])
        for item in res['items']:
            video_title = item['snippet']['title']
            video_link = f'https://www.youtube.com/watch?v={item["id"]["videoId"]}'
            video_level = classify_video_level(video_title)
            writer.writerow([video_title, video_link, video_level])

    # Share the CSV file with the user
    print(f'CSV file "{csv_file}" created and ready to be shared.')
    # Add your code here to share the file with the user (e.g., email, cloud storage, etc.)
    return os.getcwd() + f"{csv_file}" ' created and ready for you to learn.'

def classify_video_level(title):
    # Add your logic to classify the video level based on the title or description
    # You can use regular expressions, keyword matching, or any other method
    # In this example, we'll use a simple keyword matching approach

    basic_keywords = ['beginner', 'intro', 'fundamentals', 'learn fast', '10 days']
    intermediate_keywords = ['intermediate', 'advanced beginner', 'professional', 'corporate']
    advanced_keywords = ['advanced', 'expert']

    title_lower = title.lower()

    if any(keyword in title_lower for keyword in advanced_keywords):
        return 'Advanced'
    elif any(keyword in title_lower for keyword in intermediate_keywords):
        return 'Intermediate'
    elif any(keyword in title_lower for keyword in basic_keywords):
        return 'Basic'
    else:
        return 'Mixed'

def llama_classifier(topic):
    reader = SimpleDirectoryReader(input_files=[f'{topic}_videos.csv'])
    documents = reader.load_data()
    index = VectorStoreIndex.from_documents(documents)
    query_engine = index.as_query_engine()
    response = query_engine.query("can you give me a short description of the topic?")
    print(response)
    return response


def chatbot_response(user_input, learn_choice):
    # Normalize the user's input
    user_input = user_input.lower()

    if learn_choice == "now":
        return learn_now(user_input)
    elif learn_choice == "later":
        return learn_later(user_input)
    else:
        return "Sorry, I couldn't understand your choice. Please specify whether you want to learn now or later."

def learn_now(topic):
    response = search_and_share_videos(topic)
    return f"You chose to learn about {topic} now. {response}"

def learn_later(topic):
    search_and_share_videos(topic)
    time.sleep(2)
    return f"You chose to learn about {topic} later. here is a short summery of topic the file is saved fot you to learn later\n {llama_classifier(topic)}"

def send_message():
    # Get the user's input
    user_input = input_field.get()

    # Clear the input field
    input_field.delete(0, END)

    # Display the user's input in the chatbot's text area
    text_area.insert(END, f"User: {user_input}\n")

    # Ask whether the user wants to learn now or later
    text_area.insert(END, "Chatbot: Do you want to learn now or later?\n")

    # Update the send button command to call a different function for this step
    send_button.config(command=lambda: process_learning_choice(user_input))

def process_learning_choice(topic):
    # Get the user's choice to learn now or later
    learn_choice = input_field.get().lower()

    # Clear the input field
    input_field.delete(0, END)

    # Generate a response based on the user's choice
    response = chatbot_response(topic, learn_choice)

    # Display the response in the chatbot's text area
    text_area.insert(END, f"User: {learn_choice}\n")
    text_area.insert(END, f"Chatbot: {response}\n")

root = Tk()
root.title("Chatbot")

# Create the chatbot's text area
text_area = Text(root, bg="white", width=50, height=20)
text_area.pack()
text_area.insert(END, "Chatbot: Hi what do you want to learn today \n")

# Create the user's input field
input_field = Entry(root, width=50)
input_field.pack()

# Create the send button
send_button = Button(root, text="Send", command=send_message)
send_button.pack()

root.mainloop()
