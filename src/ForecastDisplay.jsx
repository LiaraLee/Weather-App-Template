import React from "react";

export function ForecastDisplay({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return <p>No forecast available.</p>;
  }

  const getHighLow = (dayData) => {
    const temps = dayData.map((d) => d.main.temp);
    const high = Math.max(...temps);
    const low = Math.min(...temps);
    return { high, low };
  };

  return (
    <div>
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {forecast.map((forecastItem, index) => {
          const date = new Date(forecastItem.dt * 1000);
          const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
          const temperature = forecastItem.main.temp;
          const weatherDescription = forecastItem.weather[0].description;
          const iconUrl = `http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;
          const { high, low } = getHighLow([forecastItem]);

          return (
            <div key={index} className="forecast-day">
              <h3>{dayOfWeek}</h3>
              <img src={iconUrl} alt={weatherDescription} />
              <p>{weatherDescription}</p>
              <p>{Math.round(temperature)}°C</p>
              <p>
                High: {Math.round(high)}°C | Low: {Math.round(low)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
