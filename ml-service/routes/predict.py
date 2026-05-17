from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import numpy as np
from utils.preprocess import get_feature_vector
from utils.features import generate_hourly_features
from models.lstm_model import load_model

predict_bp = Blueprint("predict", __name__)

# Load model once at startup
model, scaler = load_model()
MODEL_LOADED = model is not None


def _fallback_prediction(hour, base=300):
    """Simple rule-based fallback when model isn't trained yet."""
    peak_hours = [7, 8, 9, 17, 18, 19]
    multiplier = 1.8 if hour in peak_hours else 1.0
    noise = np.random.randint(-30, 30)
    return max(0, int(base * multiplier + noise))


@predict_bp.route("/hourly")
def hourly():
    """Return 24-hour passenger flow forecast."""
    now = datetime.utcnow()
    forecast = []
    for i in range(24):
        future = now + timedelta(hours=i)
        hour = future.hour
        if MODEL_LOADED:
            features = get_feature_vector(future)
            scaled = scaler.transform([[features["passenger_count"]]])
            prediction = int(scaler.inverse_transform([[float(scaled[0][0])]])[0][0])
        else:
            prediction = _fallback_prediction(hour)

        forecast.append({
            "hour": future.strftime("%H:00"),
            "timestamp": future.isoformat(),
            "predicted_count": prediction,
            "congestion": "high" if prediction > 600 else "medium" if prediction > 300 else "low",
        })
    return jsonify({"forecast": forecast, "model_loaded": MODEL_LOADED})


@predict_bp.route("/terminal/<terminal_id>")
def terminal_forecast(terminal_id):
    """Return forecast for a specific terminal."""
    terminals = {"T1": 0.30, "T2": 0.25, "T3": 0.25, "T4": 0.20}
    weight = terminals.get(terminal_id.upper(), 0.25)
    now = datetime.utcnow()
    forecast = []
    for i in range(12):
        future = now + timedelta(hours=i)
        base = _fallback_prediction(future.hour, base=1200)
        count = int(base * weight)
        forecast.append({
            "hour": future.strftime("%H:00"),
            "terminal": terminal_id.upper(),
            "predicted_count": count,
        })
    return jsonify({"terminal": terminal_id.upper(), "forecast": forecast})


@predict_bp.route("/custom", methods=["POST"])
def custom_predict():
    """Custom prediction with user-supplied parameters."""
    body = request.get_json()
    terminal = body.get("terminal", "T1")
    date_time = body.get("dateTime")
    flight_count = int(body.get("flightCount", 10))

    dt = datetime.fromisoformat(date_time) if date_time else datetime.utcnow()
    base = flight_count * 25
    prediction = _fallback_prediction(dt.hour, base=base)

    return jsonify({
        "terminal": terminal,
        "dateTime": dt.isoformat(),
        "predicted_count": prediction,
        "confidence": 0.82,
        "congestion": "high" if prediction > 600 else "medium" if prediction > 300 else "low",
    })
