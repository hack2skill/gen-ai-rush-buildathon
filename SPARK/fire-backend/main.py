from flask import Flask, jsonify, request, send_file
from flask_cors import CORS, cross_origin
import json
import os
import base64
from datetime import datetime
from pymongo import MongoClient
import urllib
from bson.json_util import dumps
import config
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain


app = Flask(__name__)
CORS(app, support_credentials=True)

os.environ["OPENAI_API_KEY"] = ''


@app.route('/')
@cross_origin(support_credentials=True)
def hello():
    return "Welcome to FIRE APP by Team SPARK"


def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks


def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore


def get_conversation_chain(vectorstore):
    llm = ChatOpenAI(temperature=0.7, model_name='gpt-3.5-turbo')
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain


@app.route('/generateIdeaDetails', methods=['POST'])
@cross_origin(support_credentials=True)
def generateIdeaDetails():
    ideaDetails = request.data.decode("utf-8")
    print(type(ideaDetails))
    print(ideaDetails)

    text_chunks = get_text_chunks(ideaDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Innovation specialits and domain expert. Your task is to elaborate the idea by looking into the existing industry and market trends in 7 to 8 lines"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateProblemStatement', methods=['POST'])
@cross_origin(support_credentials=True)
def generateProblemStatement():
    elaboratedIdeaDetails = request.data.decode("utf-8")
    text_chunks = get_text_chunks(elaboratedIdeaDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Research Analyst. Your task is to generate the problem statement for the idea. Please highlight the key problem faced by the industry and challenges in 7 to 8 lines"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateProposedSolution', methods=['POST'])
@cross_origin(support_credentials=True)
def generateProposedSolution():
    ideaProblemDetails = request.data.decode("utf-8")
    text_chunks = get_text_chunks(ideaProblemDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Product Associate. Your task is to generate a proposed solution summary from the problem statement and idea shared. Please highlight & summarize the key solutions in 7 to 8 lines"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateInnovationModules', methods=['POST'])
@cross_origin(support_credentials=True)
def generateInnovationModules():
    ideaProblemSolutionDetails = request.data.decode("utf-8")
    text_chunks = get_text_chunks(ideaProblemSolutionDetails)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Business Analyst. Your task is to share a breif summary of how it will help various business stakeholders and how will the idea be able to generate revenue & profits."})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateMarketResearch', methods=['POST'])
@cross_origin(support_credentials=True)
def generateMarketResearch():
    backgroundData = request.data.decode("utf-8")
    text_chunks = get_text_chunks(backgroundData)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Market Research Analyst. Your task is to share list of 3 to 4 competitor along with 2 to 3 lines summary of solution they provide. Also, please provide current market trends, emerging tech used in this field and key financial metrics supporting to the background data provided."})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateKeyProblems', methods=['POST'])
@cross_origin(support_credentials=True)
def generateKeyProblems():
    marketData = request.data.decode("utf-8")
    text_chunks = get_text_chunks(marketData)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Business Analyst. Your task is to list all the key problems that this solution is trying to solve along with 2-3 lines summary of each key problem identified."})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}
    # return "Well recieved"


@app.route('/generateUserStakeholders', methods=['POST'])
@cross_origin(support_credentials=True)
def generateUserStakeholders():
    backgroundMarketData = request.data.decode("utf-8")
    text_chunks = get_text_chunks(backgroundMarketData)
    vectorstore = get_vectorstore(text_chunks)
    response = get_conversation_chain(vectorstore)
    result = response(
        {"question": "Act as an Business Analyst. Your task is to list all the key stakeholders, benefeciaries and key personas along with 2-3 lines summary for all"})
    print(result['answer'])
    return {'status': 'success', 'data': result['answer']}


if __name__ == "__main__":
    app.run(port=5000, debug=True)


""" Workspace Related API's """
# @app.route('/addWorkspace', methods=['POST'])
# @cross_origin(support_credentials=True)
# def addWorkspace():
#     workspace = request.get_json(silent=True)
#     records = db.workspace
#     response = records.insert_one(workspace)
#     print(response)
#     return response


# username = urllib.parse.quote_plus(config.USERNAME)
# password = urllib.parse.quote_plus(config.PASSWORD)
# cluster = urllib.parse.quote_plus(config.CLUSTER)
# database = urllib.parse.quote_plus(config.DATABASE)

# url = "mongodb+srv://{}:{}@{}/{}?retryWrites=true&w=majority".format(username, password, cluster, database)

# client = MongoClient(url)
# db = client.get_database('fire')