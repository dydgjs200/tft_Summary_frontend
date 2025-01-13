import React, { useState } from "react";
import "./App.css";
import UserSearchForm from "./UserSearchForm.js";
import UserInfoForm from "./UserInfoForm.js";

function App() {
  const [UserInfo, setUserInfo] = useState(null);

  const handleSearchSubmit = async ({ gameName, region, tagLine }) => {
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
      setUserInfo(data); // 결과를 state에 저장
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching player information.");
    }
  };

  return (
    <div className="App">
      <h1>Fetch Player Info</h1>
      {/* 검색창 컴포넌트 */}
      <UserSearchForm onSubmit={handleSearchSubmit} />

      {/* 검색 결과 컴포넌트 */}
      <UserInfoForm userinfo={UserInfo} />
    </div>
  );
}

export default App;
