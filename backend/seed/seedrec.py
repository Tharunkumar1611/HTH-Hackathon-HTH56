import pandas as pd
import numpy as np
import pickle  # Import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Data Preparation
data = {
    'Place': ['Coimbatore', 'Salem', 'Erode', 'Madurai', 'Trichy', 'Coimbatore', 'Salem', 'Erode', 'Madurai', 'Trichy'],
    'Soil_Type': ['Red', 'Black', 'Clay', 'Sandy', 'Loamy', 'Clay', 'Red', 'Sandy', 'Black', 'Loamy'],
    'Rainfall': [700, 800, 650, 500, 750, 620, 710, 480, 820, 770],
    'Temperature': [30, 28, 32, 35, 29, 33, 31, 36, 27, 30],
    'Seed_Type': ['Paddy', 'Paddy', 'Wheat', 'Maize', 'Paddy', 'Wheat', 'Paddy', 'Maize', 'Paddy', 'Paddy']
}

df = pd.DataFrame(data)
df['Place'] = df['Place'].str.lower()
df['Soil_Type'] = df['Soil_Type'].str.lower()
df['Place_Code'] = df['Place'].astype('category').cat.codes
df['Soil_Code'] = df['Soil_Type'].astype('category').cat.codes

X = df[['Place_Code', 'Soil_Code', 'Rainfall', 'Temperature']]
y = df['Seed_Type']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Save the model as a pickle file
with open('crop_prediction_model.pkl', 'wb') as model_file:
    pickle.dump(clf, model_file)

print("Model saved as 'crop_prediction_model.pkl'")

# Load the model (for testing)
with open('crop_prediction_model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

# Check the accuracy of the loaded model
y_pred = loaded_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Loaded Model Accuracy: {accuracy * 100:.2f}%')

# User input for prediction
place = input('Enter the place: ').strip().lower()
soil_type = input('Enter the soil type (Red, Black, Clay, Sandy, Loamy): ').strip().lower()
temp = float(input('Enter the temperature: '))

# Convert inputs to numerical values
if place in df['Place'].values and soil_type in df['Soil_Type'].values:
    place_code = df[df['Place'] == place]['Place_Code'].values[0]
    soil_code = df[df['Soil_Type'] == soil_type]['Soil_Code'].values[0]
    new_data = pd.DataFrame({'Place_Code': [place_code], 'Soil_Code': [soil_code], 'Rainfall': [600], 'Temperature': [temp]})

    # Predict using the loaded model
    prediction = loaded_model.predict(new_data)[0]
    print('Predicted Seed Type:', prediction)
else:
    print('Invalid place or soil type. Please enter valid values.')
