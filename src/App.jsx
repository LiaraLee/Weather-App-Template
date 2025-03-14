import { useState, useEffect } from "react";
import {Search} from "./Search";
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
        <Search city={city} setCity={setCity} getData={getData} />
        <WeatherDisplay loading={loading} error={error} weather={weather} />
      </header>
    </div>
  );
}
export default App;
