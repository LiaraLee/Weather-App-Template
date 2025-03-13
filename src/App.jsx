import { useState, useEffect } from 'react';
import './App.css';
function App() {
  // const useState to store the weather data from the API
  const [weather, setWeather] = useState(null);

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
        setWeather(data); // stores the data in state, i think this is hwere it updates the data too?
        // console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);
  return (
    // use className instead of class beacuse react doesnt like class beacuse it is a keyword for javascript and it messes up the code when react translates to javascript, add the div to wrap the whole beacuse react doesnt like multiple elements in the middle of a code
     <div className="App">
      {/* use brackets to wrap you comments inside of jsx? */}
      <header className="App-header">
        <h1>Weather</h1>
        {/* // this checks to make sure all data is ready before it actualy renders it for users to see */}
       {weather && ( 
          <div>
          <h2>{weather.name}</h2> {/*weather+city name*/}
          <p>Temperature: {weather.main.temp}°C</p> {/*temperature displayed in celsius, maybe try to make it display both with a button?*/}
          </div>
       )}
      </header>
    </div>
  );
}
export default App;