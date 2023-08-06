from pymongo import MongoClient
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Access the desired collection and perform aggregation
collection = client['violated_data']['data']
result = collection.aggregate([])

# Convert the result to a list (if necessary) and choose a random document
result_list = list(result)
if result_list:
    random_instance = random.choice(result_list)
    print("Random Instance:")
    print(random_instance)
else:
    print("No data found.")


