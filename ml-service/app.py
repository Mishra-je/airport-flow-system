from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.predict import predict_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(predict_bp, url_prefix="/predict")

@app.route("/health")
def health():
    return {"status": "ok", "service": "ml-service"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    debug = os.environ.get("FLASK_ENV") == "development"
    print(f"🧠 ML Service running on port {port}")
    app.run(host="0.0.0.0", port=port, debug=debug)
