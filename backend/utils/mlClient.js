const axios = require("axios");

const ML_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

const mlClient = {
  async getHourlyForecast() {
    const { data } = await axios.get(`${ML_URL}/predict/hourly`);
    return data;
  },
  async getTerminalForecast(terminal) {
    const { data } = await axios.get(`${ML_URL}/predict/terminal/${terminal}`);
    return data;
  },
  async predictCustom(payload) {
    const { data } = await axios.post(`${ML_URL}/predict/custom`, payload);
    return data;
  },
};

module.exports = mlClient;
