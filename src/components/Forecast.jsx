export default function Forecast({ list }) {
  const daily = list.filter((_, index) => index % 8 === 0);

  return (
    <div className="forecast">
      {daily.map((day, i) => (
        <div key={i} className="forecast-card">
          <p>{new Date(day.dt_txt).toDateString()}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt=""
          />
          <p>{day.main.temp} °C</p>
        </div>
      ))}
    </div>
  );
}
