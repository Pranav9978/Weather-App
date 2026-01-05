export default function WeatherCard({ data }) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="card">
      <h2>{data.name}</h2>
      <img src={icon} alt="weather" />
      <p>{data.weather[0].description}</p>
      <h3>{data.main.temp} °C</h3>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  );
}
