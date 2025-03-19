export function WeatherDisplay({ loading, error, weather }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return <p>No Weather Data Available</p>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <form>
        <ul>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </li> 
          <li> 
            <label>Weather:</label>
            <span>{weather.weather[0].description}</span>
          </li> 
          <li>
            <label>Temperature:</label>
            <span>{weather.main.temp}°C</span>
          </li>
          <li>
            <label>Humidity:</label>
            <span>{weather.main.humidity}%</span>
            </li>
            <li>
            <label>Wind Speed:</label>
            <span>{weather.wind.speed} m/s</span>
            </li>
          </ul>
      </form>
    </div>
  );
}

export default WeatherDisplay;
