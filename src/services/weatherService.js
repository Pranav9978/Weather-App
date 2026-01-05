import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = (city) =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

export const getWeatherByCoords = (lat, lon) =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      units: "metric",
      appid: API_KEY,
    },
  });

export const getForecast = (city) =>
  axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });
