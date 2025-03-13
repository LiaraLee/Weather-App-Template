import { useState, useEffect } from "react";
//useState for storing and updating data that changes over time(store what is fetched), useEffect for 'side effects' like fetching data from an api or changing the title of the page or updating the dom (basically anything that impacts outside of the component, make sure it is fetched)
import "./App.css";

function App() {
  const [city, setCity] =useState("New York"); // this is the default state that will be displayed on the page if nothing is entered, also this needs to be above the other const's beacuse it is the first thing that is being set and read by the page
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

      const getData = async () => {
        setLoading(true); // set loading to true so it will show loading... while the data is being rendered (same as before I just moved it)
        const APIKEY = import.meta.env.VITE_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
        //look up what Casey said about APIKEY and why it is replaced with the key or not replaced with the key

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    // useEffect because it is a side ensure's the effect only runs once when the component is mounted,(mounts means whenever the data changes?) maybe add city as a dependancy? fetches default city
    useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
        {/* finally added input field to allow user to enter city name, it still needs css, Casey went over this in class */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name" 
        />
        {/* a button to get the requested weather data from the api, this 'triggers' the request, still needs css */}
        <button onClick={getData}>Get Weather</button>
        {loading && <p>Loading...</p>}
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
