import React, { useEffect, useState } from "react";

function TraitGallery() {
  const [imageUrls, setImageUrls] = useState([]); // 초기값 빈 배열로 설정

  useEffect(() => {
    const fetchTrait = async () => {
      try {
        const response = await fetch("http://localhost:5000/trait", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch traits: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // 디버깅: 데이터 확인
        setImageUrls(data.imageUrls || []); // imageUrls 키에 맞게 상태 설정
      } catch (error) {
        console.error("Error fetching traits:", error);
        setImageUrls([]); // 오류 시 상태를 빈 배열로 설정
      }
    };

    fetchTrait();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h2>Trait Gallery</h2>
      {/* 로딩 중 메시지 */}
      {imageUrls.length === 0 ? (
        <p>Loading images...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {/* 이미지 출력 */}
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Trait ${index}`}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TraitGallery;
