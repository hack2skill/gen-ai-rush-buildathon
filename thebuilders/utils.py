import os
import uuid
import typing
import time
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import Dict
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain.chains import create_tagging_chain

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Define function to insert a row
def insert_into_db(podcast_info: Dict):
    inserted_row, error = supabase.table("podcasts_db").insert(podcast_info).execute()
    if error:
        print(f"An error occurred: {error}")
    else:
        print("A row was inserted into the podcasts_db")

def embed_text(text: str):
    embeddings = OpenAIEmbeddings()
    query_result = embeddings.embed_query(text)
    return query_result



def create_tag(title):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo")

    schema = {
        "properties" : {
            "category" : {"type" : "string", "enum" : ["Health and Wellness", "Productivity", "Technology", "Business", "Education"]},
        },
        "required" : ["category"]
    }

    tag_chain = create_tagging_chain(schema, llm)
    return tag_chain.run(title)['category']



def create_prompt(query):
    transcripts = match_documents(query) 

    transcript_text = " ".join(transcripts)

    if len(transcripts) > 0:
        prompt = """The enclosed statements were extracted from the stored knowledge base. Use them as the context if needed."""
        prompt += "<" + transcript_text + ">" + "\n" + "Query: " + query
    else:
        prompt = query


    return prompt


def match_documents(query):
    # Generate the transcript vector
    query_transcript_vec = embed_text(query)

    # Define the match count
    match_count = 2 
        
    response, count = supabase.rpc('match_podcasts_v2', {
        'query_transcript_vec': query_transcript_vec,
        'match_count': match_count
             }).execute()
    
    _, data = response

    filtered_transcripts = [podcast['transcript'] for podcast in data if podcast['similarity'] > 0.76]

    return filtered_transcripts
