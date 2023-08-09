from flask import Flask, jsonify, request
import requests
from pymongo import MongoClient
import random
from bson import ObjectId
app = Flask(__name__)

# Replace this with your MongoDB connection string
mongo_connection_string = 'mongodb+srv://mrunal21:mrunal21@cluster0.eugjmpy.mongodb.net'
prompt = "what are security policy violations in this?"

@app.route('/random_instance', methods=['GET'])
def get_random_instance_with_prompt():
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_connection_string)
        collection = client['violatedData']['datasets']
        pipeline = [
            {"$sample": {"size": 1}}
        ]
        # Perform aggregation to get random instance
        result = collection.aggregate(pipeline)
        result_list = list(result)
        
        # Convert the result to a list (if necessary) and choose a random document
        if result_list:
            random_instance = result_list[0]
            # Convert ObjectId to string before serializing to JSON
            random_instance['_id'] = str(random_instance['_id'])
            
            # Combine prompt and random_instance data
            combined_data = {
                "prompt": prompt,
                "random_instance": random_instance
            }
            
            # Make a POST request to run_localGPT.py
            response = requests.post('http://localhost:5001/process_query', json=combined_data)
            
            return response.text
        else:
            return jsonify({"message": "No data found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
