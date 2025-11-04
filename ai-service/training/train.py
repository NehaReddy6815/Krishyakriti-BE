import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

# Load dataset
data = pd.read_csv("data/crops.csv")

# Example features and target
X = data[['rainfall', 'temperature']]
y = data['yield']

# Scale and split
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Save
joblib.dump(model, "models/yield_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("✅ Model trained and saved successfully.")
