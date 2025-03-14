import { useState, useEffect } from "react";
import { Search } from "./Search";
import { WeatherDisplay } from "./WeatherDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //original async from App.jsx with new URL from OpenWeatherMap API for geocoding and weather data
  const getData = async () => {
    setLoading(true);
    setError(null);
    const APIKEY = import.meta.env.VITE_API_KEY;
    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

    try {
      //fetch geolocation first, geo=geolocation res=response so if the geo response is not ok, throw an error
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) {
        throw new Error(`Geocoding error: ${geoRes.status}`);
      }
      const geoData = await geoRes.json();

      //now we can fetch weather data using lat and lon
      const { lat, lon } = geoData.coord;
      //new url to fetch the weather data using the lat and lon from the geolocation data we just found
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
      const weatherRes = await fetch(weatherUrl);

      //new error handling to cover any errors that may occur during the fetch with each possible type of input

      //if the weather RESponse is not ok throw an error
      if (!weatherRes.ok) {
        throw new Error(`Weather fetch error: ${weatherRes.status}`);
      }
      //if the weather response is ok, get the weather data
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      //if there is an error, set the error to the error message
    } catch (error) {
      setError(error.message);
      //finally, set loading to false to stop the loading message
    } finally {
      setLoading(false);
    }
  };
  //useEffect to call getData when the city changes
  useEffect(() => {
    getData();
  }, [city]);
  //now we can return the search bar and the weather display
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather</h1>
        <Search setCity={setCity} />
        {/*removed city and getData from Search component, the getData function runs inside of useEffect whenever city updates*/}
        <WeatherDisplay loading={loading} error={error} weather={weather} />
      </header>
    </div>
  );
}
export default App;
