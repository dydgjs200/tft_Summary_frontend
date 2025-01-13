import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Input Value: ${inputValue}`);
  };

  return (
    <div className="App">
      <h1>React Input Example</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
