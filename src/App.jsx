import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // stores the error message

  const getData = async () => {
    setLoading(true);
    setError(null); //resets the errror message before the new request
    const APIKEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      setError(error.message); // store error message instead of console.log, this updates the state when an error happens
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
        {/* display the error message*/}
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
