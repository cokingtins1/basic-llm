import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, jsonify
from flask_cors import CORS
from app.pyfuncs.test_function import custom_greeting


app = Flask(__name__)
CORS(app)

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"

@app.route('/api/hello<name>', methods=['GET'])
def greet_user(name):
    greeting = custom_greeting(name)
    return jsonify({"greeting:": greeting})

if __name__ == '__main__':
    app.run(debug=True, port=8080)