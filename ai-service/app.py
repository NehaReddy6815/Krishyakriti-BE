from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models (make sure these files exist in 'models/')
model = joblib.load("models/yield_model.pkl")
scaler = joblib.load("models/scaler.pkl")

@app.get("/")
def root():
    return {"message": "AI Service Running ✅"}

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    rainfall = data.get("rainfall")
    temperature = data.get("temperature")

    X = np.array([[rainfall, temperature]])
    X_scaled = scaler.transform(X)
    pred = model.predict(X_scaled)
    return {"predicted_yield": round(float(pred[0]), 2)}
