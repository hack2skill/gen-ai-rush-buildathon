import streamlit as st
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from utils import insert_into_db, embed_text, create_prompt, create_tag
from catalogue import get_catalogue
from elevenlabs import generate, play, set_api_key
from chat_ui import chat_interface
import os
from dotenv import load_dotenv
load_dotenv()
from elevenlabs.api.error import UnauthenticatedRateLimitError, RateLimitError

API_KEY = os.getenv("ELEVENLABS_API_KEY")

set_api_key(API_KEY)

tab1, tab2, tab3 = st.tabs(["Generate your podcast", "Talk to your podcasts", "Your catalogue"])


with tab1:
    st.title("🤖 Introducing Nexus Bot!")
    st.subheader(" 🚀 Audio learning made effective!")
    # st.write("Create AI-customized podcasts for your workout or commute.")

    topic_name = st.text_input("Enter the topic name:")
    time = st.number_input("Enter the length of the audio in minutes:", min_value=0.5, max_value=3.0, value=0.5, step=0.5,format="%.1f")
    language = st.selectbox(
        'Please select the language of your audio',
        ('English', 'Hindi', 'Telugu'))
    voice = st.radio(
            label="Choose a voice", options=['Rachel', 'Adam'], index=0, horizontal=True)

    if st.button("Make my clip!"):
        # system_template = "Generate content for a podcast monologue on {topic_name} for an approx length of {time} minutes."
        system_template = "Generate content for a podcast monologue in 70 words on {topic_name}."
        # print(system_template)
        system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)

        human_template="{text}"
        human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

        chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])

        formatted_prompt = chat_prompt.format_prompt(topic_name=topic_name, time=time, text="").to_messages()

        chat = ChatOpenAI(model_name="gpt-3.5-turbo",temperature=0.3)
        response = chat(formatted_prompt)

        # st.text_area("Generated Content:", value=response.content, height=200)

        transcript = response.content

        try:
            audio = generate(text=transcript, voice=voice, model='eleven_multilingual_v1', )
            st.write("Here's your podcast clip! ")
            st.audio(data=audio)
        except UnauthenticatedRateLimitError:
            e = UnauthenticatedRateLimitError("Unauthenticated Rate Limit Error")
            st.exception(e)

        except RateLimitError:
            e = RateLimitError('Rate Limit')
            st.exception(e)

        with st.expander("Transcript"):
            st.write(transcript)

        podcast_info = {
        "username": "DefaultUser",
        "topic": topic_name,
        "language": "English",
        "voice": voice,
        "audio_length": len(audio),
        "transcript": transcript,
        "category" : create_tag(topic_name),
        "transcript_vec": embed_text(transcript),
    }
        insert_into_db(podcast_info)

with tab2:
    st.write("Talk to YOUR knowledge base!")
    chat_interface()

with tab3:
    st.write("Here's the list of all our podcasts!")
    get_catalogue()










