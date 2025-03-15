//you were missing ()``) in every template literal!!!!!!!!!

// Both API requests have error handling, so if one fails, 
// we catch the error and display a message instead of breaking the app

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

//original api was incorrect for fetching weather data from more than a city name, it goes: city name - lat/lon (geocoding) then use lat/lon - get weather data.

    try {
      let weatherUrl;

      // you forgot the zip codes! This checks if city contains only numbers, meaning it’s a ZIP code, ie no letters or special characters

      if (/^\d+$/.test(city)) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${city},US&appid=${APIKEY}&units=metric`;
      } else {
        // now we get latitude & longitude for a city name, lat lon 
        //pull from new url await fetch from url check if its ok, if not throw error, then parse the data, if no data throw error, then extract the lat and lon from the first object in the array
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) throw new Error(`Geocoding error: ${geoRes.status}`);

        const geoData = await geoRes.json(); // Parse response

        // you forgot to chack if no there was no data, you no data = throw error, this is important becasue this prevents the app from crashing if there is no data, now it will just display the error message

        if (!geoData.length) throw new Error("Location not found. Try another search.");

        const { lat, lon } = geoData[0]; // Extract coordinates
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
      }

      // now fetch weather data from above api url, check if its ok, if not throw error, then parse the data, if no data throw error, then set the weather data
      const weatherRes = await fetch(weatherUrl);
      if (!weatherRes.ok) throw new Error(`Weather fetch error: ${weatherRes.status}`);

      const weatherData = await weatherRes.json();
      setWeather(weatherData);
//if there is an error, set the error message
    } catch (error) {
      setError(error.message);
//finally set loading to false so it doesnt keep the loading message going if it is not loading anymore
    } finally {
      setLoading(false);
    }
  };

 // When the user types a new city and presses Enter, 
// `setCity` updates, triggering `useEffect`, which calls `getData()` with the new city
  useEffect(() => {
    getData();
  }, [city]);
//return the app with the header, h1, search component from search.jsx, and weather display component from weatherDisplay.jsx
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
