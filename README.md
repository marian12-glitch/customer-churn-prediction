# Customer Churn Prediction System

A machine learning system that predicts customer churn using a Scikit-learn Pipeline, 
with a FastAPI endpoint serving live predictions and a React frontend.

![CI](https://github.com/marian12-glitch/customer-churn-prediction/actions/workflows/ci.yaml/badge.svg)

## Live Demo
- **Frontend:** (coming soon — deploying to Netlify)
- **API:** https://customer-churn-prediction-1200.onrender.com
- **API Docs:** https://customer-churn-prediction-1200.onrender.com/docs

## Project Structure
- `notebooks/` — EDA, model training, SHAP explainability, and Optuna tuning
- `app/` — FastAPI application serving live predictions
- `frontend/` — React frontend for customer churn prediction
- `model/` — saved trained model (joblib)
- `tests/` — pytest unit tests
- `data/` — raw dataset (not tracked by Git)

## Models Compared
| Model | Accuracy | Churn F1 | AUC-ROC |
|-------|----------|----------|---------|
| Logistic Regression | 0.80 | 0.59 | 0.838 |
| Random Forest | 0.79 | 0.55 | 0.817 |
| XGBoost (default) | 0.77 | 0.54 | 0.811 |
| XGBoost (tuned) | 0.80 | 0.59 | 0.838 |

**Selected model: Logistic Regression** — matches tuned XGBoost performance with lower complexity.

## Key Findings
- Tenure is the strongest predictor — newer customers churn far more
- High monthly charges increase churn risk significantly
- Two-year contracts strongly reduce churn likelihood
- Fiber optic internet customers show higher churn tendency
- Engineered feature `income_per_tenure` ranked 7th out of 26 features

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
Scikit-learn · XGBoost · SHAP · Optuna · FastAPI · Docker · React · pytest · GitHub Actions CI/CD