function Search({ setCity, getData }) {
  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getData}>Get Weather</button>
    </div>
  );
}

export default Search;
