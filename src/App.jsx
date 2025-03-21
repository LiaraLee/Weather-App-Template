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
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${city},US&appid=${APIKEY}&units=metric`;
      } else {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error(`Geocoding error: ${geoRes.status}`);

        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("Location not found. Try another search.");

        const { lat, lon } = geoData[0];
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
      }

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error(`Weather fetch error: ${weatherRes.status}`);
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error(`Forecast fetch error: ${forecastRes.status}`);
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.reduce((acc, entry) => { 
        const date = entry.dt_txt.split(" ")[0];
        if (!acc[date]) {
          acc[date] = { tempMin: entry.main.temp, tempMax: entry.main.temp, weather: entry.weather[0] };
        } else {
          acc[date].tempMin = Math.min(acc[date].tempMin, entry.main.temp);
          acc[date].tempMax = Math.max(acc[date].tempMax, entry.main.temp); 
        }
        return acc;
      }, {});

      setForecast(Object.entries(dailyForecast).map(([date, data]) => ({ date, ...data })));
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
        {forecast && !loading && <ForecastDisplay forecast={forecast} />}
      </header>
    </div>
  );
}

export default App;
