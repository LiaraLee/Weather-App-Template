import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  // initializing a new loading state to true to show a loading message while the data is being fetched
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getData = async () => {
      const APIKEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=New+York&appid=${APIKEY}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }

        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error(error.message);
      }
      finally {
        // setting the loading state to false after the data has been fetched, or if an error occurs, basically turns off the loading message if there is an error or if the data has been fetched
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
        {loading && <p>Loading...</p>}{/* this is where it actually displays a loading message for the user while the data is being fetched */}
        {/* now we add !lading && to stop the lading message from displaying if the data has been fetched. basically we start with loading true and weather null then once the data is fetched weather becomes true and loading becomes null thus displaying your weather data and removing your loading message */}
        {weather && !loading && ( 
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
