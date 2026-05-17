# ✈️ AI-Based Airport Passenger Flow Prediction System

A full-stack production-level system that predicts and visualizes passenger flow at airports using AI/ML, real-time data, and a modern React dashboard.

---

## 🏗️ Architecture Overview

```
airport-flow-system/
├── frontend/          # React.js + Tailwind CSS + Recharts
├── backend/           # Node.js + Express + Socket.IO + JWT
├── ml-service/        # Python + Flask + TensorFlow/Scikit-learn
└── shared/            # Shared constants/types
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account
- npm or yarn

### 1. Clone & Setup

```bash
git clone <your-repo>
cd airport-flow-system
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Fill in your MongoDB URI, JWT_SECRET
npm run dev
```

### 3. ML Service Setup
```bash
cd ml-service
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env   # Set REACT_APP_API_URL
npm start
```

---

## 🌐 Services & Ports

| Service      | Port  | Description                    |
|-------------|-------|--------------------------------|
| Frontend     | 3000  | React dev server               |
| Backend API  | 5000  | Express REST API + Socket.IO   |
| ML Service   | 8000  | Flask prediction API           |
| MongoDB      | Cloud | MongoDB Atlas                  |

---

## 🔑 Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/airport_flow
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
ML_SERVICE_URL=http://localhost:8000
CLIENT_URL=http://localhost:3000
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### ML Service `.env`
```
FLASK_ENV=development
PORT=8000
MODEL_PATH=./models/saved/
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint            | Description       |
|--------|---------------------|-------------------|
| POST   | /api/auth/register  | Register user     |
| POST   | /api/auth/login     | Login & get token |
| GET    | /api/auth/me        | Get current user  |

### Flights
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | /api/flights          | List all flights    |
| POST   | /api/flights          | Add flight          |
| GET    | /api/flights/:id      | Get flight by ID    |
| PUT    | /api/flights/:id      | Update flight       |
| DELETE | /api/flights/:id      | Delete flight       |

### Predictions
| Method | Endpoint                     | Description                |
|--------|------------------------------|----------------------------|
| GET    | /api/predictions/current     | Current flow prediction    |
| GET    | /api/predictions/hourly      | Hourly predictions (24h)   |
| GET    | /api/predictions/terminal/:id| Terminal-specific forecast |
| POST   | /api/predictions/custom      | Custom prediction input    |

### Alerts
| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /api/alerts      | Get all alerts     |
| POST   | /api/alerts      | Create alert       |
| PUT    | /api/alerts/:id  | Update alert       |

---

## 🧠 ML Model

- **Algorithm**: LSTM (Long Short-Term Memory) neural network
- **Features**: Hour of day, day of week, flight schedule, season, holidays, historical flow
- **Output**: Predicted passenger count per terminal per hour
- **Training Data**: Stored in `ml-service/data/`
- **Notebooks**: Exploratory analysis in `ml-service/notebooks/`

---

## 🔌 Real-time Features (Socket.IO Events)

| Event                  | Direction       | Description                   |
|------------------------|-----------------|-------------------------------|
| `flow:update`          | Server → Client | Real-time passenger count     |
| `alert:new`            | Server → Client | New congestion alert          |
| `prediction:refresh`   | Server → Client | Updated ML predictions        |
| `flight:status`        | Server → Client | Flight status change          |

---

## 👤 Roles & Auth

| Role    | Permissions                                  |
|---------|----------------------------------------------|
| admin   | Full access: flights, alerts, user mgmt      |
| analyst | View predictions, manage alerts              |
| viewer  | Read-only dashboard access                   |

---

## 📁 Full Folder Structure

```
airport-flow-system/
├── README.md
├── docker-compose.yml
│
├── frontend/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── .env.example
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.jsx
│       ├── components/
│       │   ├── Dashboard/
│       │   │   ├── StatsCard.jsx
│       │   │   ├── FlowChart.jsx
│       │   │   ├── TerminalHeatmap.jsx
│       │   │   └── LiveCounter.jsx
│       │   ├── Auth/
│       │   │   ├── LoginForm.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   ├── Predictions/
│       │   │   ├── PredictionChart.jsx
│       │   │   └── HourlyForecast.jsx
│       │   ├── FlightMap/
│       │   │   └── FlightMap.jsx
│       │   └── Alerts/
│       │       ├── AlertBanner.jsx
│       │       └── AlertList.jsx
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── PredictionsPage.jsx
│       │   ├── FlightsPage.jsx
│       │   └── AlertsPage.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── SocketContext.jsx
│       ├── hooks/
│       │   ├── useAuth.js
│       │   ├── useSocket.js
│       │   └── usePredictions.js
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── flightService.js
│       │   └── predictionService.js
│       └── utils/
│           ├── formatters.js
│           └── constants.js
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Flight.js
│   │   ├── PassengerFlow.js
│   │   └── Alert.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── flightController.js
│   │   ├── predictionController.js
│   │   └── alertController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── flights.js
│   │   ├── predictions.js
│   │   └── alerts.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── roleCheck.js
│   │   └── errorHandler.js
│   ├── socket/
│   │   └── socketHandlers.js
│   └── utils/
│       └── mlClient.js
│
└── ml-service/
    ├── app.py
    ├── requirements.txt
    ├── .env.example
    ├── models/
    │   ├── lstm_model.py
    │   ├── train.py
    │   └── saved/           ← trained model files go here
    ├── routes/
    │   └── predict.py
    ├── utils/
    │   ├── preprocess.py
    │   └── features.py
    ├── data/
    │   └── sample_flow_data.csv
    └── notebooks/
        └── EDA_and_Training.ipynb
```

---

## 📦 Tech Stack Summary

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React.js, Tailwind CSS, Recharts, Axios, React Router DOM |
| Backend    | Node.js, Express.js, JWT, Socket.IO          |
| ML/AI      | Python, Flask, TensorFlow, Scikit-learn, Pandas, NumPy |
| Database   | MongoDB Atlas                                |

---

## 🎓 College Project Tips

1. **Start with the ML model** — train on sample data first
2. **Build backend API** — connect to MongoDB Atlas
3. **Add real-time** with Socket.IO for live dashboard
4. **Frontend last** — wire up to real API endpoints
5. **Demo flow**: Login → Dashboard → Live predictions → Alerts

---

*Built for college AI project submission.*
