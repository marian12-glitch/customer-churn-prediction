import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.model import predict_churn

# Sample customer data for testing
sample_customer = {
    "gender": 1,
    "SeniorCitizen": 0,
    "Partner": 1,
    "Dependents": 0,
    "tenure": 12,
    "PhoneService": 1,
    "OnlineSecurity": 0,
    "OnlineBackup": 0,
    "DeviceProtection": 0,
    "TechSupport": 0,
    "StreamingTV": 1,
    "StreamingMovies": 1,
    "PaperlessBilling": 1,
    "MonthlyCharges": 75.5,
    "TotalCharges": 906.0,
    "total_services": 3,
    "income_per_tenure": 5.808,
    "MultipleLines_No_phone_service": 0,
    "MultipleLines_Yes": 1,
    "InternetService_Fiber_optic": 1,
    "InternetService_No": 0,
    "Contract_One_year": 0,
    "Contract_Two_year": 0,
    "PaymentMethod_Credit_card_automatic": 0,
    "PaymentMethod_Electronic_check": 1,
    "PaymentMethod_Mailed_check": 0
}

def test_prediction_is_binary():
    result = predict_churn(sample_customer)
    assert result["churn_prediction"] in [0, 1]

def test_probability_between_0_and_1():
    result = predict_churn(sample_customer)
    assert 0.0 <= result["churn_probability"] <= 1.0

def test_risk_level_is_valid():
    result = predict_churn(sample_customer)
    assert result["risk_level"] in ["Low", "Medium", "High"]

def test_output_has_required_keys():
    result = predict_churn(sample_customer)
    assert "churn_prediction" in result
    assert "churn_probability" in result
    assert "risk_level" in result

def test_high_risk_customer():
    high_risk = sample_customer.copy()
    high_risk["tenure"] = 1
    high_risk["MonthlyCharges"] = 100.0
    high_risk["Contract_Two_year"] = 0
    result = predict_churn(high_risk)
    assert result["churn_probability"] > 0.3