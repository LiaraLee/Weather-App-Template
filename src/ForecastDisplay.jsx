import React from "react";

//first we need to create a ForecastDisplay component that takes in a forecast prop, which is an array of forecast data from the API, and returns a JSX element <p> if the forecast data is empty, that says "No forecast available."

export function ForecastDisplay({ forecast }) { //create a ForecastDisplay component that takes in a forecast prop
  if (!forecast || forecast.length === 0) {//if the forecast data is empty, return a <p> element that says "No forecast available."
    return <p>No forecast available.</p>;
  }

  // Map through (get it from the App.jsx) the forecast data and display it in a readable format, similar to what we did for WeatherDisplay
  return (
    <div>
      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {forecast.map((day, index) => { //map through the forecast data and display it in a readable format
          const date = new Date(day.dt * 1000); // Convert Unix timestamp to a Date object
          const dayOfWeek = date.toLocaleDateString ("en-US", { weekday: "long" }); // Get the day of the week
          const temperature = day.main.temp; // Get the temperature
          const weatherDescription = day.weather[0].description; // Get the weather description
          const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`; // get the icon from OpenWeather API
//return a div element for each day in the forecast data, displaying the day of the week, the weather icon, the weather description, and the temperature using the data we fetched in App.jsx then rendered above
          return (
            <div key={index} className="forecast-day">
              <h3>{dayOfWeek}</h3>
              <img src={iconUrl} alt={weatherDescription} />
              <p>{weatherDescription}</p>
              <p>{Math.round(temperature)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
