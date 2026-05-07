from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schema import CustomerData, PredictionResult
from app.model import predict_churn

app = FastAPI(
    title="Customer Churn Prediction API",
    description="Predicts whether a telecom customer will churn",
    version="1.0.0"
)

# Allow React frontend to talk to the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Churn Prediction API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResult)
def predict(customer: CustomerData):
    result = predict_churn(customer.model_dump())
    return result