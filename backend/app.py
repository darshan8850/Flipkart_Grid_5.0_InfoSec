from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

import random
from flask_socketio import emit

@socketio.on('connect')
def test_connect():
    emit('server_response', {'data': 'Connected'})

@socketio.on('get_data')
def get_data():
    # Generate some random data for demonstration
    data = [random.random() for _ in range(10)]
    emit('server_response', {'data': data})

if __name__ == '__main__':
    socketio.run(app)