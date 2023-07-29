# write a basic flask app 
from flask import Flask, render_template, request
import subprocess
from last_command import get_last_command
from llm import get_resolution

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
