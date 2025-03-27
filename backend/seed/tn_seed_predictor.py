import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# Load datasets
soil_types_df = pd.read_csv('tamil_nadu_soil_types.csv')
soil_crops_df = pd.read_csv('tamil_nadu_soil_crops.csv')
temperature_df = pd.read_csv('tamil_nadu_temperature.csv')
districts_df = pd.read_csv('tamil_nadu_districts.csv')

# Prepare soil-crops mapping
soil_crop_map = {}
for _, row in soil_crops_df.iterrows():
    soils = [s.strip() for s in row['Soil Type'].split(',')]
    crops = [c.strip() for c in row['Recommended Crops & Seeds'].split(',')]
    for soil in soils:
        soil_crop_map[soil] = crops[0]  # Take first recommended crop

# Create training data
data = []
for _, row in soil_types_df.iterrows():
    district = row['District']
    primary_soil = row['Primary Soil Type']
    secondary_soil = row['Secondary Soil Type']
    temp_data = temperature_df[temperature_df['District'] == district].iloc[0]
    
    # Add entry for primary soil
    data.append({
        'District': district,
        'Soil_Type': primary_soil,
        'Seed_Type': soil_crop_map.get(primary_soil, 'Unknown'),
        **temp_data.to_dict()
    })
    
    # Add entry for secondary soil
    data.append({
        'District': district,
        'Soil_Type': secondary_soil,
        'Seed_Type': soil_crop_map.get(secondary_soil, 'Unknown'),
        **temp_data.to_dict()
    })

df = pd.DataFrame(data)
df = df[df['Seed_Type'] != 'Unknown']  # Remove entries with unknown crops

# Encode categorical variables
le_district = LabelEncoder()
le_soil = LabelEncoder()
le_seed = LabelEncoder()

df['District_Code'] = le_district.fit_transform(df['District'])
df['Soil_Code'] = le_soil.fit_transform(df['Soil_Type'])
df['Seed_Code'] = le_seed.fit_transform(df['Seed_Type'])

# Prepare features and target
feature_cols = ['District_Code', 'Soil_Code'] + \
               [f for f in df.columns if f in ['Jan','Feb','Mar','Apr','May','Jun',
                                              'Jul','Aug','Sep','Oct','Nov','Dec']]
X = df[feature_cols]
y = df['Seed_Code']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Evaluate
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Model Accuracy: {accuracy * 100:.2f}%')

# Prediction function
def predict_seed_type():
    print("\nAvailable Districts:")
    print(", ".join(sorted(df['District'].unique())))
    
    print("\nAvailable Soil Types:")
    print(", ".join(sorted(df['Soil_Type'].unique())))
    
    district = input("\nEnter district: ").strip()
    soil_type = input("Enter soil type: ").strip()
    month = input("Enter month (Jan-Dec): ").strip().capitalize()
    
    if (district not in df['District'].values or 
        soil_type not in df['Soil_Type'].values or 
        month not in ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec']):
        print("Invalid input! Please check your entries.")
        return
    
    # Get temperature data
    temp_data = temperature_df[temperature_df['District'] == district].iloc[0]
    temp = temp_data[month]
    
    # Prepare input for prediction
    input_data = {
        'District_Code': le_district.transform([district])[0],
        'Soil_Code': le_soil.transform([soil_type])[0],
        'Jan': temp_data['Jan'],
        'Feb': temp_data['Feb'],
        'Mar': temp_data['Mar'],
        'Apr': temp_data['Apr'],
        'May': temp_data['May'],
        'Jun': temp_data['Jun'],
        'Jul': temp_data['Jul'],
        'Aug': temp_data['Aug'],
        'Sep': temp_data['Sep'],
        'Oct': temp_data['Oct'],
        'Nov': temp_data['Nov'],
        'Dec': temp_data['Dec']
    }
    input_df = pd.DataFrame([input_data])
    
    # Predict
    prediction_code = clf.predict(input_df)[0]
    predicted_seed = le_seed.inverse_transform([prediction_code])[0]
    
    print(f"\nRecommendation for {district} ({month} temp: {temp}°C, Soil: {soil_type}):")
    print(f"🌱 {predicted_seed}")

# Run prediction
while True:
    predict_seed_type()
    if input("\nPredict another? (y/n): ").lower() != 'y':
        break