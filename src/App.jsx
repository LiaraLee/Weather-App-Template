import { useState, useEffect } from 'react';
import './App.css';
function App() {
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
        setWeather(data); // stores and updates the data in state
        // console.log(data); removed beacause setWeather is already logging the data dynamically, use if you need to debug though 
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, []);
  return (
     <div className="App">
      {/* YES! use brackets to wrap you comments inside of jsx beacuse they qualify as an element and react only accepts one element inside of the return */}
      <header className="App-header">
        <h1>Weather</h1>
        {/* logical and operator basically if truthy render <p> if not null,nope! for looks like .map() */}
       {weather && (
          <div>
          <h2>{weather.name}</h2> {/*weather+city name*/}
          <p>Temperature: {weather.main.temp}°C</p> {/*temperature displayed in celsius, definitely make a button but not ready for that just yet */}
          </div>
       )}
      </header>
    </div>
  );
}
export default App;