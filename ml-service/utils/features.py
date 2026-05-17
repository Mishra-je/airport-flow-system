from datetime import datetime, timedelta


PEAK_HOURS = [6, 7, 8, 9, 17, 18, 19, 20]
HOLIDAY_MONTHS = [12, 1, 7, 8]  # approximate high-travel months


def generate_hourly_features(start: datetime, hours: int = 24) -> list:
    """Generate feature dicts for the next N hours."""
    features = []
    for i in range(hours):
        dt = start + timedelta(hours=i)
        features.append({
            "timestamp": dt.isoformat(),
            "hour": dt.hour,
            "day_of_week": dt.weekday(),
            "is_weekend": int(dt.weekday() >= 5),
            "is_peak": int(dt.hour in PEAK_HOURS),
            "is_holiday_season": int(dt.month in HOLIDAY_MONTHS),
        })
    return features
