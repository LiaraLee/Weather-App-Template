import { useState, useEffect } from "react";
import { Search } from "./Search";
import { WeatherDisplay } from "./WeatherDisplay";
import { ForecastDisplay } from "./ForecastDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    const APIKEY = import.meta.env.VITE_API_KEY;

    try {
      let weatherUrl;
      let forecastUrl;

      if (/^\d+$/.test(city)) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${city},US&appid=${APIKEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${city},US&appid=${APIKEY}&units=metric`; // US zip code api call for weather and forecast data 
      } else {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error(`Geocoding error: ${geoRes.status}`);

        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("Location not found. Try another search."); // if the location is not found, throw an error

        const { lat, lon } = geoData[0];
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`; // if the location is found, get the lat and lon and use it to get the weather and forecast data
      }

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error(`Weather fetch error: ${weatherRes.status}`); // if the weather fetch fails, throw an error
      const weatherData = await weatherRes.json(); // if the fetch is successful, get the data
      setWeather(weatherData);

      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error(`Forecast fetch error: ${forecastRes.status}`);  // if the forecast fetch fails, throw an error
      const forecastData = await forecastRes.json();

      // Process forecast data to group by date and extract high/low
      const dailyForecast = forecastData.list.reduce((acc, entry) => { //reduce is used to take an array and reduce it to a single value, in this case we are taking the forecast data and reducing it to a single object
        const date = entry.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD
        if (!acc[date]) { //If the date doesn't exist in the accumulator object (acc), you create a new key in acc with the date and initialize it with the temperature values and weather description, for clarity in any other situation call it something else like forecastByDate but for now im keeping it so I learn it
          acc[date] = { tempMin: entry.main.temp, tempMax: entry.main.temp, weather: entry.weather[0] };
        } else {
          acc[date].tempMin = Math.min(acc[date].tempMin, entry.main.temp); //If the date already exists in acc, you update the temperature values if the current temperature is lower/higher than the existing values
          acc[date].tempMax = Math.max(acc[date].tempMax, entry.main.temp); //If the date already exists in acc, you update the temperature values if the current temperature is lower/higher than the existing values
        }
        return acc; //fianlly return the full accumulator object
      }, {});

      setForecast(Object.entries(dailyForecast).map(([date, data]) => ({ date, ...data }))); //Object.entries() is used to convert the object to an array of key-value pairs, then you map over the array to create a new array of objects with the date and temperature values for each day in the forecast data array 
    } catch (error) {
      setError(error.message); //if there is an error, set the error state to the error message, same as before
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [city]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
        <Search setCity={setCity} />
        <WeatherDisplay loading={loading} error={error} weather={weather} />
        {forecast && !loading && <ForecastDisplay forecast={forecast} />}
      </header>
    </div>
  );
}

export default App;
