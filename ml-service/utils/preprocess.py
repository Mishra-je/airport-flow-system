import pandas as pd
import numpy as np
from datetime import datetime


def get_feature_vector(dt: datetime) -> dict:
    """Extract ML features from a datetime object."""
    return {
        "hour": dt.hour,
        "day_of_week": dt.weekday(),
        "month": dt.month,
        "is_weekend": 1 if dt.weekday() >= 5 else 0,
        "is_peak_hour": 1 if dt.hour in [7, 8, 9, 17, 18, 19] else 0,
        "passenger_count": 300,  # placeholder; replace with real sensor data
    }


def load_and_clean(csv_path: str) -> pd.DataFrame:
    """Load and clean raw CSV passenger flow data."""
    df = pd.read_csv(csv_path, parse_dates=["timestamp"])
    df = df.dropna(subset=["passenger_count", "timestamp"])
    df = df.sort_values("timestamp").reset_index(drop=True)
    df["passenger_count"] = df["passenger_count"].clip(lower=0)
    return df
