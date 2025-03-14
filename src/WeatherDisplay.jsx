//display the weather details, will accept weather, loading, and error as props from App.js

//Pulled from original App.js, turned into a new function that will first 

function WeatherDisplay({loading, error, weather}){ //destructuring props so we can use them directly
    if (loading) return <p>Loading...</p>;//If loading is true, we return a message saying "Loading..." until it is false and the data is loaded from the API fetched in App.js
    if (error) return <p>{error}</p>; //If error is true, we return early with a message showing the error (so nothing else renders)
    if (!weather) return <p>No Weather Data Available</p>;//If there's no weather data yet (i.e., the weather state is still null), we show a loading message

    //Otherwise, we render the weather data,This part will only render if the weather state has data (i.e., after the API fetch is successful). 

    return (
        <div>
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p> {/*this is copied from the original app.js but adjusted to only be weather display because error and serch are now in the if*/} 
        </div>
    )
}

export default WeatherDisplay; //exporting the function so it can be imported and used in App.js..DONT FORGET THE EXPORT