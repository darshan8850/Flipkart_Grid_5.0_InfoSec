from flask import Flask, jsonify
import aiohttp
import asyncio

app = Flask(__name__)

async def fetch_random_instance():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://127.0.0.1:5000/random_instance') as response:
            if response.status == 200:
                return await response.json()
            else:
                return None

async def fetch_answer(instance_data):
    async with aiohttp.ClientSession() as session:
        async with session.get('http://127.0.0.1:5000/temp', json=instance_data) as response:
            if response.status == 200:
                return await response.json()
            else:
                return None

@app.route('/get_answer', methods=['GET'])
async def get_answer():
    try:
        instance_data = await fetch_random_instance()
        
        if instance_data is None:
            return jsonify({"error": "Failed to fetch random instance data"}), 500
        
        answer_data = await fetch_answer(instance_data)
        
        if answer_data is None:
            return jsonify({"error": "Failed to fetch answer"}), 500
        
        return jsonify(answer_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
