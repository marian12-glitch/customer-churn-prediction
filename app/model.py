import joblib
import numpy as np
from pathlib import Path

# Load model once when the app starts
MODEL_PATH = Path(__file__).parent.parent / "model" / "churn_model.joblib"
model = joblib.load(MODEL_PATH)

def predict_churn(data: dict) -> dict:
    # Convert input to numpy array in the right column order
    features = np.array([[
        data['gender'],
        data['SeniorCitizen'],
        data['Partner'],
        data['Dependents'],
        data['tenure'],
        data['PhoneService'],
        data['OnlineSecurity'],
        data['OnlineBackup'],
        data['DeviceProtection'],
        data['TechSupport'],
        data['StreamingTV'],
        data['StreamingMovies'],
        data['PaperlessBilling'],
        data['MonthlyCharges'],
        data['TotalCharges'],
        data['total_services'],
        data['income_per_tenure'],
        data['MultipleLines_No_phone_service'],
        data['MultipleLines_Yes'],
        data['InternetService_Fiber_optic'],
        data['InternetService_No'],
        data['Contract_One_year'],
        data['Contract_Two_year'],
        data['PaymentMethod_Credit_card_automatic'],
        data['PaymentMethod_Electronic_check'],
        data['PaymentMethod_Mailed_check'],
    ]])

    prediction = int(model.predict(features)[0])
    probability = float(model.predict_proba(features)[0][1])

    if probability >= 0.7:
        risk = "High"
    elif probability >= 0.4:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "churn_prediction": prediction,
        "churn_probability": round(probability, 3),
        "risk_level": risk
    }