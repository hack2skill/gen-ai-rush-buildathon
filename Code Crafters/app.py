from database.db import init_database, insert_chat_message, get_chat_history
import streamlit as st
import requests

def chatbot_response(input_text):
    url = 'https://avid-infinity-386618.el.r.appspot.com/api'
    payload = {'userPrompt': input_text}
    try:
        with requests.post(url, json=payload) as response:
            response.raise_for_status()  # Check for any HTTP errors
            data = response.json()
            print(data)
            return data
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'
     
def display_chat_history(chat_history):
    st.subheader("Chat History")
    chat_container = st.empty()
    chat_log = ""
    # Process the chat history to make it more readable and display it
    for index, (sender, message) in enumerate(chat_history):
        if sender == "You":
            chat_log += f'<div style="text-align: left; padding-left: 20px; padding: 1.5rem; color:#fff; background-color: #333;">{message}</div>'
        elif sender == "PrivateGPT":
            chat_log += f'<div style="text-align: right; padding-left: 20px; padding: 1.5rem; color:#fff; background-color: #555;">{message}</div>'
    chat_container.write(chat_log, unsafe_allow_html=True)

def clear_chat_history():
    st.session_state.chat_history = []

    
        
def main():
    # Initialize the database and chat history table
    db_connected = init_database()

    if db_connected:
        print("Database connection successful 🔗")
    else:
        print("Database connection failed ❌")
        st.stop()
    
    # Get the chat history from the database
    chat_history = get_chat_history()
    
    # Initialize SessionState to store chat history
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    st.title("Private GPT")

    # Sidebar with settings
    st.sidebar.title("Settings")
    # Add more settings as needed

    # Apply custom CSS to change the background color
    background_color = "#444654"
    st.markdown(
        f"""
        <style>
        body {{
            background-color: {background_color};
        }}
        </style>
        """,
        unsafe_allow_html=True,
    )

    
    # Add a container to hold the textbox
    container = st.container()
    container.markdown(
        """
        <style>
        .st-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 10px;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
    user_input = container.text_input("You:", "",key="text_input")

    if st.button("Send"):
        response = chatbot_response(user_input)
        st.session_state.chat_history.append(("You", user_input))
        st.session_state.chat_history.append(("PrivateGPT", response["privatePrompt"]))
        insert_chat_message("You", user_input)
        insert_chat_message("PrivateGPT", response["privatePrompt"])
        user_input = ""  # Clear the user input after sending

    #  # Display previous chats in the sidebar
    st.sidebar.subheader("Chat History")
    st.sidebar.markdown(
        """
        <style>
        .sidebar .sidebar-content {
            background-color: #333;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
    if st.sidebar.button("Show chat history"):
        # Show chat history
        display_chat_history(chat_history)

    if st.sidebar.button("Clear chat history"):
        clear_chat_history()
    
    st.subheader("Chat")
    chat_container = st.empty()
    chat_log = ""
    for sender, message in st.session_state.chat_history:
        if sender == "You":
            chat_log += f'<div style="text-align: left; padding-left: 20px; padding: 1.5rem; color:#fff; background-color: #333;">{message}</div>'
        elif  sender == "PrivateGPT":
             chat_log += f'<div style="text-align: left; padding-left: 20px; padding: 1.5rem; color:#fff; background-color: #555;">{message}</div>'


    chat_container.write(chat_log, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
