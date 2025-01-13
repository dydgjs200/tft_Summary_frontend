import React, { useState } from "react";
import "./App.css";

function App() {
  const [gameName, setGameName] = useState("");
  const [region, setRegion] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [playerInfo, setPlayerInfo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // POST 요청을 Backend로 보냄
    try {
      const response = await fetch(`http://localhost:5000/user/${gameName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          region,
          tagLine,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch player information");
      }

      const data = await response.json();
      setPlayerInfo(data); // 결과를 state에 저장
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching player information.");
    }
  };

  return (
    <div className="App">
      <h1>Fetch Player Info</h1>
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

      {playerInfo && (
        <div className="player-info">
          <h2>Player Info:</h2>
          <p>
            <strong>Game Name:</strong> {playerInfo.gameName}
          </p>
          <p>
            <strong>Region:</strong> {playerInfo.region}
          </p>
          <p>
            <strong>Tagline:</strong> {playerInfo.tagLine}
          </p>
          <p>
            <strong>Tier:</strong> {playerInfo.tier}
          </p>
          <p>
            <strong>Rank:</strong> {playerInfo.rank}
          </p>
          <p>
            <strong>LP:</strong> {playerInfo.leaguePoints}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
