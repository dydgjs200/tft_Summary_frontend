import React, { useState } from "react";
import "./App.css";
import UserSearchForm from "./UserSearchForm.js";
import UserInfoForm from "./UserInfoForm.js";
import UserMatchForm from "./UserMatchListForm.js";
import TraitGallery from "./TraitForm"; // TraitGallery 컴포넌트 import

function App() {
  const [UserInfo, setUserInfo] = useState(null);
  const [UserMatch, setUserMatch] = useState(null);
  const [activeFeature, setActiveFeature] = useState("matchSearch"); // 현재 활성화된 기능 상태

  // 전적 검색 기능
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
      setUserMatch(data.matchList);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching player information.");
    }
  };

  return (
    <div className="App">
      <h1>Fetch Player Info</h1>

      {/* 기능 선택 버튼 */}
      <div>
        <button onClick={() => setActiveFeature("matchSearch")}>
          전적 검색
        </button>
        <button onClick={() => setActiveFeature("traitSearch")}>
          시너지 검색
        </button>
      </div>

      {/* 전적 검색 UI */}
      {activeFeature === "matchSearch" && (
        <>
          <UserSearchForm onSubmit={handleSearchSubmit} />
          <UserInfoForm userinfo={UserInfo} />
          <UserMatchForm userMatch={UserMatch} />
        </>
      )}

      {/* 시너지 검색 UI */}
      {activeFeature === "traitSearch" && (
        <TraitGallery /> // TraitGallery 컴포넌트 사용
      )}
    </div>
  );
}

export default App;
