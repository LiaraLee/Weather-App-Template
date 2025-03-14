import { useState, useEffect } from "react";
import { Search } from "./Search";
import { WeatherDisplay } from "./WeatherDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    const APIKEY = import.meta.env.VITE_API_KEY;
    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

    try {
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) {
        throw new Error(`Geocoding error: ${geoRes.status}`);
      }

      const geoData = await geoRes.json();
      const { lat, lon } = geoData.coord;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;

      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) {
        throw new Error(`Weather fetch error: ${weatherRes.status}`);
      }

      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      
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
      </header>
    </div>
  );
}
export default App;
