from flask import Flask,request, jsonify
from funcs.test_function import custom_greeting
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

@app.route('/api/flask/', methods=['GET'])
def hello_world():
    return "Hello, World!"

@app.route('/api/flask/greeting/<name>', methods=['GET'])
def greet_user(name:str) -> str:
    greeting = custom_greeting(name)
    return jsonify({"greeting": greeting})

@app.route('/api/flask/cap', methods=['POST'])
def process():
    data = request.get_json()
    app.logger.info(data)
    print(data)
    return jsonify({'result': data})

if __name__ == '__main__':
    app.run(debug=True, port=8080)