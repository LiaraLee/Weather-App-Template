import React from "react";

export function ForecastDisplay({ forecast }) {
  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecast.map(({ date, tempMin, tempMax, weather }) => (
          <div key={date} className="forecast-card">
            <h3>
              {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
            </h3>
            <p>{new Date(date).toLocaleDateString()}</p>
            <p>High: {Math.round(tempMax)}°C</p>
            <p>Low: {Math.round(tempMin)}°C</p>
            <p>{weather.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
