import os
from llama_index import SimpleDirectoryReader, GPTVectorStoreIndex
from flask import Flask, request, jsonify
from threading import Thread

os.environ[
  'OPENAI_API_KEY'] = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

print("Initializing...")

# Load you data into 'Documents' a custom type by LlamaIndex
documents = SimpleDirectoryReader('./data').load_data()

print("Building GPT Vector Store Index")

# Create an index of your documents
index = GPTVectorStoreIndex.from_documents(documents)

print("Creating and saving index")
# Query your index!
query_engine = index.as_query_engine()
print("Training completed! Starting server... \n\nPress 'ctrl+c' to quit.")



print("\t Saaha-AI (AI Bot) - V1.0 \n\n")

app = Flask(__name__)


# Setting CORS header
@app.after_request
def add_cors_header(response):
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response


@app.route('/')
def home():
  return 'Hello World!'


@app.route('/chat', methods=['POST'])
def chat():
  user_message = request.form.get('message')

  #Query model
  response = query_engine.query(user_message)
  return jsonify({'response': response})


@app.route('/chat/start')
def firstMsg():
  return jsonify({
    'response':
    'Hi there! I am Saaha-AI chat bot. How can I assist you with your emergency case?'
  })


def run():
  app.run(host='0.0.0.0', port=443)


def keep_alive():
  t = Thread(target=run)
  t.start()


keep_alive()
