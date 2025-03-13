import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    const APIKEY = import.meta.env.VITE_API_KEY; // Importing environment variable, basically importing my api key from .env file I made
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      const data = await res.json();
      setWeather(data);
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
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getData}>Get Weather</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && !loading && !error && (
          <div>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
        )}
      </header>
    </div>
  );
}
export default App;
