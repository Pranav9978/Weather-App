import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌙 THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // APPLY THEME
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // 🌍 FETCH BY CITY
  const fetchByCity = async (cityName) => {
    const cleanCity = cityName.trim();
    if (!cleanCity) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cleanCity
        )},IN&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();
      if (data.cod !== 200) throw new Error("No city found");

      setWeather(data);
      setCity(data.name);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🌍 AUTO LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
        setCity(data.name);
      },
      () => fetchByCity("Mumbai")
    );
  }, []);

  return (
    <div className="container">
      <div className="weather-box">
        {/* 🌙 TOGGLE BUTTON */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <h1>🌦 Weather App</h1>

        <div className="search-box">
          <input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchByCity(city)}
          />
          <button onClick={() => fetchByCity(city)}>Search</button>
        </div>

        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="card">
            <h2>{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h3>{weather.main.temp} °C</h3>
            <p>{weather.weather[0].description}</p>

            <div className="details">
              <span>💧 {weather.main.humidity}%</span>
              <span>🌬 {weather.wind.speed} m/s</span>
            </div>
          </div>
        )}

        {/* ✅ FOOTER */}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Weather App | Developed by{" "}
            <b>Pranav Khegade</b>
          </p>
        </footer>
      </div>
    </div>
  );
}
