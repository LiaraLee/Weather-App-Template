import { useState, useEffect } from "react";
import { Search } from "./Search";
import { WeatherDisplay } from "./WeatherDisplay";
import { ForecastDisplay } from "./ForecastDisplay"; //import the ForecastDisplay component
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null); //set the forecast to null

  const getData = async () => {
    setLoading(true);
    setError(null);
    const APIKEY = import.meta.env.VITE_API_KEY;

    try {
      let weatherUrl;
      let forecastUrl; //create a forecastUrl variable

      if (/^\d+$/.test(city)) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${city},US&appid=${APIKEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&cnt=5`;//set the forecastUrl to the API endpoint for the forecast data
      } else {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error(`Geocoding error: ${geoRes.status}`);

        const geoData = await geoRes.json();

        if (!geoData.length)
          throw new Error("Location not found. Try another search.");

        const { lat, lon } = geoData[0];
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&cnt=5`;//set the forecastUrl to the API endpoint for the forecast data
      }

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok)
        throw new Error(`Weather fetch error: ${weatherRes.status}`);

      // very similar to what we did for WeatherDisplay, fetch the weather data and forecast data from the API, if there is an error, throw an error message, if there is no error, set the weather and forecast data to the data fetched from the API
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok)
        throw new Error(`Forecast fetch error: ${forecastRes.status}`);
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list); //set the forecast data to the data fetched from the API assuming the 'list' contains the forcast array

    } catch (error) {
      setError(error.message);
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
        {forecast && !loading && <ForecastDisplay forecast={forecast} />} {/* just like we did with WeatherDisplay and Search conditionally render ForecastDisplay */}
      </header>
    </div>
  );
}

export default App;
