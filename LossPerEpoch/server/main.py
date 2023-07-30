import os
from typing import Annotated
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.traverse_file import bfs_traversal
from utils.traverse_file import bfs_traversal_with_models_py
from utils.folder_to_zip import folder_to_zip
from utils.extract_zip import extract_zip

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

def create_folder_if_not_exists(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


@app.get("/")
def home():
    return {"Doxify": "Works"}

@app.get("/doxify_all")
def generate_all_docs(file_path):
    # tech_stack="DJango"
    bfs_traversal(file_path)
    # if(tech_stack=="DJango"):
    #     generate_erd()
    # folder_to_zip("docs", "output")
    # zip_file_path = "output/docs.zip"
    return {"message": "All files doxified."}

@app.post("/doxify")
async def upload_file(file: UploadFile = File(...)):
    upload_folder = "uploads"
    docs_folder = "docs"
    create_folder_if_not_exists(docs_folder)
    create_folder_if_not_exists(upload_folder)
    
    with open(f'{upload_folder}/{file.filename}', 'wb') as f:
        while chunk := await file.read(1024):
            f.write(chunk)
    extract_zip(f'uploads/{file.filename}', "files")
    generate_all_docs("./files")

    folder_to_zip(docs_folder, "output")
    zip_file_path = "output.zip"

    return FileResponse(zip_file_path, filename="docs.zip")

@app.get("/zipFile")
def zip_file():
    response = folder_to_zip("docs", "output")
    return {"message": f"response: {response}"}

@app.get("/extractZip")
def extract_zip_file():
    response = extract_zip("output.zip", "files")
    return {"message": f"response: {response}"}
