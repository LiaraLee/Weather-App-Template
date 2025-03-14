//input field and button for searching, will accept setCity and getData as props since they belong to the App.js state

function Search({setCity, getData}){ //created a new function for destructuring props so we can use them directly
   
    return ( // so when search is called return both the input field and the button, when the button is clicked it will call getData

        <div> {/*div to hold the input field and button since we can only return one element in react*/}
        {/* do i want to keep this header? CSS */}
        <h1>Weather</h1>
        <input //input field for city name
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getData}>Get Weather</button> {/*button to get weather data, calls getData from App.jsx*/}
        </div>
    )
}

export default Search;