# Customer Churn Prediction System

A machine learning system that predicts customer churn using a Scikit-learn Pipeline, 
with a FastAPI endpoint serving live predictions.

![CI](https://github.com/marian12-glitch/customer-churn-prediction/workflows/CI/badge.svg)

## Live API
> URL will be added after deployment on Render

## Project Structure
- `notebooks/` — EDA, model training, SHAP explainability, and Optuna tuning
- `app/` — FastAPI application serving live predictions
- `model/` — saved trained model (joblib)
- `tests/` — pytest unit tests
- `data/` — raw dataset (not tracked by Git)

## Models Compared
| Model | F1 Score | AUC-ROC |
|-------|----------|---------|
| Logistic Regression | TBD | TBD |
| Random Forest | TBD | TBD |
| XGBoost | TBD | TBD |

## How to Run Locally
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## How to Run with Docker
```bash
docker build -t churn-api .
docker run -p 8000:8000 churn-api
```

## Skills Demonstrated
Scikit-learn · XGBoost · SHAP · Optuna · FastAPI · Docker · pytest · GitHub Actions