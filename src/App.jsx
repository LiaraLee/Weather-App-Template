//only controls fetching and managing data, no styling or rendering, no search or error 

import { useState, useEffect } from "react";
import {WeatherDisplay} from "./WeatherDisplay"; //importing the WeatherDisplay function from the WeatherDisplay.js file so it can be used as a prop in this file
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
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getData}>Get Weather</button>

        {/*everything is mostly the same as the original App.js file, but the WeatherDisplay function is imported from the WeatherDisplay.js file and used as a component in the return statement. I put it at the bottom here beacuse it is what I want to see rendered after I do or dont get the data from the above try block*/}
        <WeatherDisplay loading={loading} error={error} weather={weather} />
        {/* this section is now in the WeatherDisplay.js file but its broken down as if statements. 
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && !loading && !error && (
          <div>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
        )} */}
      </header>
    </div>
  );
}
export default App;
