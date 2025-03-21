import React from "react"; // Make sure to import React

export function ForecastDisplay({ forecast }) { //create a function that takes in the prop forecast, which is an array of data from the API fetched in App.js

  //since we are not fetching data here, we can just map over the forecast prop and display the data

  return ( 
    <div className="forecast-container"> {/* dont forget that react needs one parent element to return, always wrap your return if you need to use mutlipe*/}

      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {/*this is where we start mapping over the forecast prop and displaying the data*/}
        {forecast.map(({ date, tempMin, tempMax, weather }) => (  //use forcast which is called in our function and holds the data from the api, add it to map (map is built into react) and destructure (meaning we break it apart to fit where we need it to) the object to get the date, tempMin, tempMax, and weather
          <div key={date} className="forecast-card"> {/*key is used to help react keep track of the elements, it should be unique, so we use the date here*/}
            <h3>{new Date(date).toLocaleDateString("en-US", { weekday: "long" })}</h3> {/*this is how we format the date to show the day of the , take the date given to us then convert the date into a string ased on the location, then render it in english using weekday: long to make the day name monday as opposed to mon*/}
            <p>{new Date(date).toLocaleDateString()}</p> {/*this is the same as above but it will show the full date, not just the day*/}
            <p>High: {Math.round(tempMax)}°C</p> {/*math.round is used to round the number to the nearest whole number, so dispaly high: then the tempMax rounded to the nearest whole number*/}
            <p>Low: {Math.round(tempMin)}°C</p> {/*same as above but for tempMin*/}
            <p>{weather.description}</p> {/*display the weather description, pulled from the api*/}
            {/*this is how we display the weather icon, we use the icon from the api and add it to the url to display the icon*/}
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description} /*this is the alt text for the image, it will display the weather description if the image fails to load*/
            />
          </div>
        ))}
      </div>
    </div>
  );
}
