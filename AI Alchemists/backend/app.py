from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for the entire app

@app.route('/')
def home():
    return "Hello, this is the homepage!"

@app.route('/about')
def about():
    return "This is the about page."

@app.route('/check')
def check():
    return "Hello"

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
    app.run(debug=True)
