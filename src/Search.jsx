import { useState } from "react";
//now we dont need  city or getData. We now use input to cover what the user is typing in the search bar, basically the search bar takes setCity as a prop and then we use the input to set the city to the input value and update the city state in App.js
export function Search({ setCity }) {
  const [input, setInput] = useState(""); //input is the value of the search bar, setInput is the function that updates the input value, this is hwere we store the value of the search bar

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the form from submitting which is the default setting in browsers
    if (!input.trim()) return; //prevents submitting an empty form, stopping the function from running if the input is empty
    setCity(input); // Updates the city state in App.jsx, which triggers a new API call
    setInput(""); //clears the search bar after submitting
  };
  // We use handleSubmit to control the form behavior and update the city state in App.js
  // When the user types, the input field updates, and when they submit, we fetch weather data for the entered location
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter city, zip, or address"
        value={input}
        onChange={(e) => setInput(e.target.value)} // this updates the input value as the user types
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
export default Search;
