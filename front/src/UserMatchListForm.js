import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function UserMatchForm({ userMatch }) {
  const [matchDetails, setMatchDetails] = useState([]);

  useEffect(() => {
    if (userMatch) {
      const fetchMatchDetails = async () => {
        try {
          const details = await Promise.all(
            userMatch.slice(0, 5).map(async (match) => {
              const response = await fetch(
                `https://asia.api.riotgames.com/tft/match/v1/matches/${match}?api_key=${API_KEY}`,
              );
              if (!response.ok) {
                throw new Error(`Failed to fetch details for match: ${match}`);
              }
              return await response.json();
            }),
          );
          setMatchDetails(details);
        } catch (error) {
          console.error("Error fetching match details:", error);
        }
      };

      fetchMatchDetails();
    }
  }, [userMatch]);

  if (!userMatch) {
    return <p>No match list available.</p>; // 데이터가 없는 경우 처리
  }

  return (
    <div>
      <h2>User Match List</h2>
      <ul>
        {matchDetails.map((detail, index) => (
          <li key={index}>
            <p>{detail.metadata.participants}</p>
            <p>
              게임 날짜 :{" "}
              {new Date(detail.info.game_datetime).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserMatchForm;
