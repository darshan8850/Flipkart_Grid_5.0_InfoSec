from flask import Flask, jsonify
from pymongo import MongoClient
import random
from bson import ObjectId

app = Flask(__name__)

# Replace this with your MongoDB connection string
mongo_connection_string = 'mongodb+srv://mrunal21:mrunal21@cluster0.eugjmpy.mongodb.net'

@app.route('/random_instance', methods=['GET'])
def get_random_instance():
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
            return jsonify(random_instance)
        else:
            return jsonify({"message": "No data found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
