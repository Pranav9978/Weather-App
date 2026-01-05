import { useEffect, useState } from "react";
import "./App.css";
import { getCurrentWeather, getWeatherByCoords } from "./services/weatherService";

export default function App() {
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

      const res = await getCurrentWeather(cleanCity);
      const data = res.data;
      if (Number(data.cod) !== 200) throw new Error(data.message || "No city found");

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
        try {
          const res = await getWeatherByCoords(latitude, longitude);
          const data = res.data;
          setWeather(data);
          setCity(data.name);
        } catch (e) {
          fetchByCity("Mumbai");
        }
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
           <a href="https://my-portfolio-project-eight-pied.vercel.app/" target="_blank" rel="noopener noreferrer"><b>Pranav Khegade</b></a> 
          </p>
        </footer>
      </div>
    </div>
  );
}
