import { useState } from "react";
import axios from "axios";

const defaultForm = {
  gender: 1,
  SeniorCitizen: 0,
  Partner: 0,
  Dependents: 0,
  tenure: 12,
  PhoneService: 1,
  OnlineSecurity: 0,
  OnlineBackup: 0,
  DeviceProtection: 0,
  TechSupport: 0,
  StreamingTV: 0,
  StreamingMovies: 0,
  PaperlessBilling: 0,
  MonthlyCharges: 50.0,
  TotalCharges: 600.0,
  total_services: 1,
  income_per_tenure: 3.8,
  MultipleLines_No_phone_service: 0,
  MultipleLines_Yes: 0,
  InternetService_Fiber_optic: 0,
  InternetService_No: 0,
  Contract_One_year: 0,
  Contract_Two_year: 0,
  PaymentMethod_Credit_card_automatic: 0,
  PaymentMethod_Electronic_check: 0,
  PaymentMethod_Mailed_check: 0,
};

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", form);
      setResult(response.data);
    } catch (err) {
      setError("Failed to get prediction. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  const riskColor = {
    Low: "#27500A",
    Medium: "#633806",
    High: "#7B1C1C",
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1 style={{ color: "#1F4E79" }}>Customer Churn Predictor</h1>
      <p style={{ color: "#5F5E5A" }}>Enter customer details to predict churn risk.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Gender (0=F, 1=M)", name: "gender" },
          { label: "Senior Citizen (0/1)", name: "SeniorCitizen" },
          { label: "Partner (0/1)", name: "Partner" },
          { label: "Dependents (0/1)", name: "Dependents" },
          { label: "Tenure (months)", name: "tenure" },
          { label: "Monthly Charges ($)", name: "MonthlyCharges" },
          { label: "Total Charges ($)", name: "TotalCharges" },
          { label: "Total Services", name: "total_services" },
          { label: "Income per Tenure", name: "income_per_tenure" },
          { label: "Paperless Billing (0/1)", name: "PaperlessBilling" },
          { label: "Phone Service (0/1)", name: "PhoneService" },
          { label: "Online Security (0/1)", name: "OnlineSecurity" },
          { label: "Online Backup (0/1)", name: "OnlineBackup" },
          { label: "Device Protection (0/1)", name: "DeviceProtection" },
          { label: "Tech Support (0/1)", name: "TechSupport" },
          { label: "Streaming TV (0/1)", name: "StreamingTV" },
          { label: "Streaming Movies (0/1)", name: "StreamingMovies" },
          { label: "Multiple Lines - Yes (0/1)", name: "MultipleLines_Yes" },
          { label: "Multiple Lines - No Phone (0/1)", name: "MultipleLines_No_phone_service" },
          { label: "Internet - Fiber Optic (0/1)", name: "InternetService_Fiber_optic" },
          { label: "Internet - No Service (0/1)", name: "InternetService_No" },
          { label: "Contract - One Year (0/1)", name: "Contract_One_year" },
          { label: "Contract - Two Year (0/1)", name: "Contract_Two_year" },
          { label: "Payment - Credit Card (0/1)", name: "PaymentMethod_Credit_card_automatic" },
          { label: "Payment - Electronic Check (0/1)", name: "PaymentMethod_Electronic_check" },
          { label: "Payment - Mailed Check (0/1)", name: "PaymentMethod_Mailed_check" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label style={{ fontSize: 12, color: "#5F5E5A", display: "block", marginBottom: 4 }}>
              {label}
            </label>
            <input
              type="number"
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid #D3D1C7",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#1F4E79",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Predicting..." : "Predict Churn"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 16 }}>{error}</p>
      )}

      {result && (
        <div style={{
          marginTop: 24,
          padding: 20,
          borderRadius: 10,
          background: "#F1EFE8",
          borderLeft: `4px solid ${riskColor[result.risk_level]}`,
        }}>
          <h2 style={{ color: "#1F4E79", marginTop: 0 }}>Prediction Result</h2>
          <p><strong>Churn Prediction:</strong> {result.churn_prediction === 1 ? "Will Churn ⚠️" : "Will Stay ✅"}</p>
          <p><strong>Churn Probability:</strong> {(result.churn_probability * 100).toFixed(1)}%</p>
          <p><strong>Risk Level:</strong> <span style={{ color: riskColor[result.risk_level], fontWeight: "bold" }}>{result.risk_level}</span></p>
        </div>
      )}
    </div>
  );
}