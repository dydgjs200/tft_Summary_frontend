import React from "react";

const UserInfoForm = ({ userinfo }) => {
  if (userinfo == null) return null;

  return (
    <div className="player-info">
      <h2>Player Info:</h2>
      <p>
        <strong>Game Name:</strong> {userinfo.gameName}
      </p>
      <p>
        <strong>Region:</strong> {userinfo.region}
      </p>
      <p>
        <strong>Tagline:</strong> {userinfo.tagLine}
      </p>
      <p>
        <strong>Tier:</strong> {userinfo.tier}
      </p>
      <p>
        <strong>Rank:</strong> {userinfo.rank}
      </p>
      <p>
        <strong>LP:</strong> {userinfo.leaguePoints}
      </p>
    </div>
  );
};

export default UserInfoForm;
