from flask import Flask,request, jsonify
from funcs.test_function import custom_greeting
from funcs.another import generate_response
from flask_cors import CORS

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
    prompt:str = data['prompt']
    print(f"data: {data['prompt']}")
    response = generate_response(prompt)
    print(f"data: {response}")
    return jsonify({'result': response})


if __name__ == '__main__':
    app.run(debug=True, port=8080)