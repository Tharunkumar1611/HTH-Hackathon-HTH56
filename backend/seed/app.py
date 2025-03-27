from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Load the trained model
with open('crop_prediction_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Reference data for encoding
data = {
    'Place': ['coimbatore', 'salem', 'erode', 'madurai', 'trichy'],
    'Soil_Type': ['red', 'black', 'clay', 'sandy', 'loamy']
}
df = pd.DataFrame(data)
df['Place_Code'] = df['Place'].astype('category').cat.codes
df['Soil_Code'] = df['Soil_Type'].astype('category').cat.codes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        req_data = request.json
        place = req_data.get('place', '').strip().lower()
        soil_type = req_data.get('soilType', '').strip().lower()
        temp = float(req_data.get('temperature', 0))

        # Validate input
        if place not in df['Place'].values or soil_type not in df['Soil_Type'].values:
            return jsonify({'error': 'Invalid place or soil type'}), 400
        
        # Convert to numerical values
        place_code = df[df['Place'] == place]['Place_Code'].values[0]
        soil_code = df[df['Soil_Type'] == soil_type]['Soil_Code'].values[0]
        
        # Prepare input for model
        input_data = pd.DataFrame({
            'Place_Code': [place_code], 
            'Soil_Code': [soil_code], 
            'Rainfall': [600], 
            'Temperature': [temp]
        })

        # Make prediction
        prediction = model.predict(input_data)[0]
        
        return jsonify({'predicted_crop': prediction})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
