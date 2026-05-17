"""
Train the LSTM model on historical passenger flow data.
Run: python -m models.train
"""
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from lstm_model import build_lstm_model, create_sequences, save_model
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "sample_flow_data.csv")
SEQ_LENGTH = 24  # 24 hours lookback


def train():
    print("📊 Loading data...")
    df = pd.read_csv(DATA_PATH, parse_dates=["timestamp"])
    df = df.sort_values("timestamp")

    # Use passenger_count as target
    counts = df["passenger_count"].values.reshape(-1, 1)

    print("⚙️  Preprocessing...")
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(counts)

    X, y = create_sequences(scaled, SEQ_LENGTH)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    print(f"📐 Training shape: {X_train.shape}, Test shape: {X_test.shape}")

    model = build_lstm_model((SEQ_LENGTH, 1))
    model.summary()

    print("🏋️  Training...")
    model.fit(
        X_train, y_train,
        validation_data=(X_test, y_test),
        epochs=50,
        batch_size=32,
        callbacks=[
            __import__("tensorflow").keras.callbacks.EarlyStopping(
                patience=5, restore_best_weights=True
            )
        ],
    )

    save_model(model, scaler)
    print("✅ Training complete!")


if __name__ == "__main__":
    train()
