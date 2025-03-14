function WeatherDisplay({ loading, error, weather }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return <p>No Weather Data Available</p>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
    </div>
  );
}

export default WeatherDisplay;
