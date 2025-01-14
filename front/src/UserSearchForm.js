import React, { useState } from "react";

const SearchForm = ({ onSubmit }) => {
  const [gameName, setGameName] = useState("");
  const [region, setRegion] = useState("");
  const [tagLine, setTagLine] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 부모 컴포넌트로 데이터를 전달
    onSubmit({ gameName, region, tagLine });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tagline"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
