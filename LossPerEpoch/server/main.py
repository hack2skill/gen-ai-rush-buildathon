
# import os
# from queue import Queue
# from llama_cpp import Llama
# from fastapi import FastAPI

# app = FastAPI()

# llm = Llama(model_path="./model/llama-2-7b-chat.ggmlv3.q2_K.bin")

# def bfs_traversal(root_dir):
#     queue = Queue()
#     queue.put(root_dir)

#     while not queue.empty():
#         current_dir = queue.get()

#         try:
#             with os.scandir(current_dir) as entries:
#                 for entry in entries:
#                     if entry.is_dir():
#                         queue.put(entry.path)
#                     else:
#                         process_file(entry.path)
#         except OSError as e:
#             print("Error accessing directory:", e)

# def process_file(file_path):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         prompt_text = file.read()
#         # try:
#         #     output = llm(f"For the given code, generate a documentation in Markdown Format, the documentation should follow all the best practices : {prompt_text}", max_tokens=2000, echo=True)
#         #     response_text = output['choices'][0]['text']
#         #     print("Doxified:", response_text)
#         # except Exception as e:
#         #     print("Error generating documentation:", str(e))
#         print(prompt_text)

# @app.get("/")
# def home():
#     return {"Doxify": "Works"}

# @app.get("/doxify_all")
# def generate_all_docs():
#     bfs_traversal("./files")
#     return {"message": "All files doxified."}

from typing import Annotated
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utils.traverse_file import bfs_traversal
from utils.traverse_file import bfs_traversal_with_models_py
from utils.folder_to_zip import folder_to_zip
from utils.extract_zip import extract_zip
# import erdantic as erd

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def generate_erd():
    bfs_traversal_with_models_py("./files/")
    print("Generating ERD....")


@app.get("/")
def home():
    return {"Doxify": "Works"}

@app.get("/doxify_all")
def generate_all_docs():
    # tech_stack="DJango"
    bfs_traversal("./files")
    # if(tech_stack=="DJango"):
    #     generate_erd()
    return {"message": "All files doxified."}

@app.post("/doxify")
async def upload_file(file: UploadFile = File(...)):
    with open(f'uploads/{file.filename}', 'wb') as f:
        while chunk := await file.read(1024):
            f.write(chunk)
    extract_zip(f'uploads/{file.filename}', "files")


    return {'message': 'File uploaded successfully'}



@app.get("/zipFile")
def zip_file():
    response = folder_to_zip("files", "output")
    return {"message": f"response: {response}"}

@app.get("/extractZip")
def extract_zip_file():
    response = extract_zip("output.zip", "files")
    return {"message": f"response: {response}"}
