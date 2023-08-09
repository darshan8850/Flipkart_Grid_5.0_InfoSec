from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load your pickled models
model1 = joblib.load('scripts/LLM/DB/index/id_to_uuid_594d45d9-5336-487a-9ed9-4dbf12ef07d4.pkl')
model2 = joblib.load('scripts/LLM/DB/index/index_metadata_594d45d9-5336-487a-9ed9-4dbf12ef07d4.pkl')
model3 = joblib.load('scripts/LLM/DB/index/uuid_to_id_594d45d9-5336-487a-9ed9-4dbf12ef07d4.pkl')


@app.route('/predict_get', methods=['GET']) 
def predict_get():
    data = request.args  # Get input data from query string parameters
    
    # Process input data 
    features = [data['feature1'], data['feature2'], ...]
    
    # Make predictions with loaded models  
    prediction1 = model1.predict([features])
    prediction2 = model2.predict([features]) 
    prediction3 = model3.predict([features])
    
    # Return predictions
    response = {
        'prediction1': prediction1.tolist(),
        'prediction2': prediction2.tolist(), 
        'prediction3': prediction3.tolist()
    }
    return jsonify(response)
if __name__ == '__main__':
    app.run(debug=True)
