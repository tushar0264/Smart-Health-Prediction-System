# File: backend/ml-service/brain_server.py

from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# --- Load your trained model ---
# This example uses a heart disease model.
# Make sure your .pkl files are in this same folder.
try:
    heart_model = joblib.load('heart_model.pkl')
    heart_model_columns = joblib.load('heart_columns.pkl')
    print("✅ Heart disease model loaded successfully!")
except FileNotFoundError:
    heart_model = None
    print("🔴 Error: Could not find heart_model.pkl or heart_columns.pkl")


@app.route('/predict/heart', methods=['POST'])
def predict_heart():
    if not heart_model:
        return jsonify({'error': 'Model not loaded'}), 500

    # Get the symptom data sent by the 'Waiter'
    symptoms = request.get_json()
    
    # Prepare the data for the model
    query_df = pd.DataFrame(symptoms, index=[0])
    query_df = query_df.reindex(columns=heart_model_columns, fill_value=0)

    # Make the prediction (it will be 0 or 1)
    prediction = heart_model.predict(query_df)
    
    # Send the simple result back
    return jsonify({'prediction_result': int(prediction[0])})

if __name__ == '__main__':
    # The 'Brain' runs on port 8000
    print("🤖 Python 'Brain' is listening on http://127.0.0.1:8000")
    app.run(port=8000)