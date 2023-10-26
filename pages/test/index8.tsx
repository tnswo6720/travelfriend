/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import styled from "@emotion/styled";

interface Place {
  name: string;
  season: string[];
  rating: string;
  cost: "저렴" | "보통" | "비싼";
  image: string; // 여행지 이미지 URL
  description: string; // 여행지 설명
}

const placesData: Place[] = [
  // 10개의 장소 데이터를 추가했습니다.
  {
    name: "장소1",
    season: ["봄", "여름"],
    rating: "5",
    cost: "저렴",
    image: "장소1이미지URL",
    description: "장소1설명",
  },
  {
    name: "장소2",
    season: ["여름"],
    rating: "4",
    cost: "보통",
    image: "장소2이미지URL",
    description: "장소2설명",
  },
  {
    name: "장소3",
    season: ["가을", "겨울"],
    rating: "3",
    cost: "비싼",
    image: "장소3이미지URL",
    description: "장소3설명",
  },
  // 아래는 예시용 데이터입니다. 실제로는 각 장소에 맞는 데이터를 넣어주세요.
  {
    name: "장소4",
    season: ["봄"],
    rating: "5",
    cost: "보통",
    image: "장소4이미지URL",
    description: "장소4설명",
  },
  {
    name: "장소5",
    season: ["여름"],
    rating: "4",
    cost: "비싼",
    image: "장소5이미지URL",
    description: "장소5설명",
  },
  {
    name: "장소6",
    season: ["가을"],
    rating: "3",
    cost: "저렴",
    image: "장소6이미지URL",
    description: "장소6설명",
  },
  {
    name: "장소7",
    season: ["겨울"],
    rating: "2",
    cost: "보통",
    image: "장소7이미지URL",
    description: "장소7설명",
  },
  {
    name: "장소8",
    season: ["봄", "여름"],
    rating: "1",
    cost: "비싼",
    image: "장소8이미지URL",
    description: "장소8설명",
  },
  {
    name: "장소9",
    season: ["가을", "겨울"],
    rating: "5",
    cost: "저렴",
    image: "장소9이미지URL",
    description: "장소9설명",
  },
  {
    name: "장소10",
    season: ["봄", "여름", "가을", "겨울"],
    rating: "4",
    cost: "보통",
    image: "장소10이미지URL",
    description: "장소10설명",
  },

  {
    name: "장소11",
    season: ["여름"],
    rating: "3",
    cost: "보통",
    image: "장소11이미지URL",
    description: "장소11설명",
  },
  {
    name: "장소12",
    season: ["봄", "여름", "가을"],
    rating: "1",
    cost: "비싼",
    image: "장소8이미지URL",
    description: "장소8설명",
  },
  {
    name: "장소13",
    season: ["가을", "겨울"],
    rating: "5",
    cost: "저렴",
    image: "장소13이미지URL",
    description: "장소9설명",
  },
  {
    name: "장소14",
    season: ["봄", "여름", "가을", "겨울"],
    rating: "4",
    cost: "보통",
    image: "장소14이미지URL",
    description: "장소10설명",
  },
];

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
`;

const FilterSection = styled.div`
  margin-right: 2em;
  height: 100vh; // 화면 전체 높이에 맞춤
  overflow-y: auto; // 필요할 경우 스크롤 표시
`;

const Label = styled.label`
  display: block;
`;
const ContentSection = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향으로 나눕니다.
  width: 80%;
`;

const ContentTop = styled.div`
  flex: 1; // 상단 영역이 전체의 1/3을 차지하도록 합니다.
`;

const ContentBottom = styled.div`
  display: flex; // 가로 방향으로 배치합니다.
  flex: 2; // 하단 영역이 전체의 2/3을 차지하도록 합니다.
  flex-wrap: wrap; // 컨텐츠가 넘칠 경우 다음 줄로 넘깁니다.
`;

const PlaceCard = styled.div`
  flex: 1 0 33%; // flex-grow, flex-shrink, flex-basis를 한 번에 설정합니다.
`;

const PlaceImage = styled.img`
  width: 100%;
  height: auto;
`;
export default function TravelFilter(): JSX.Element {
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleCheckboxChange =
    (setSelectedFunc: React.Dispatch<React.SetStateAction<string[]>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (event.target.checked) {
        setSelectedFunc((prev) => [...prev, value]);
      } else {
        setSelectedFunc((prev) => prev.filter((item) => item !== value));
      }
    };

  const filteredPlaces = placesData.filter(
    (place) =>
      (selectedSeasons.length === 0 ||
        selectedSeasons.some((season) => place.season.includes(season))) &&
      (selectedRatings.length === 0 ||
        selectedRatings.includes(place.rating)) &&
      (selectedCosts.length === 0 || selectedCosts.includes(place.cost))
  );

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentPlaces = filteredPlaces.slice(startIndex, endIndex);

  return (
    <Container>
      <FilterSection>
        추천 계절:<br></br>
        <br></br>
        {["봄", "여름", "가을", "겨울"].map((s) => (
          <label key={s}>
            <input
              type="checkbox"
              value={s}
              onChange={handleCheckboxChange(setSelectedSeasons)}
            />
            {s}
          </label>
        ))}
        <br></br>
        <br></br>
        평점:<br></br>
        <br></br>
        {[1, 2, 3, 4, 5].map((r) => (
          <Label key={r.toString()}>
            {" "}
            {/* Use the Label component instead of the label element. */}
            <input
              type="checkbox"
              value={r.toString()}
              onChange={handleCheckboxChange(setSelectedRatings)}
            />
            {"⭐".repeat(r)}
          </Label>
        ))}
        <br></br>
        <br></br>
        관광지 물가:<br></br>
        <br></br>
        {["저렴", "보통", "비싼"].map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              value={c}
              onChange={handleCheckboxChange(setSelectedCosts)}
            />
            {c}
          </label>
        ))}
      </FilterSection>

      <ContentSection>
        <ContentTop>{/* 이 공간에 새로운 콘텐츠를 띄우세요 */}</ContentTop>
        <ContentBottom>
          {/* Render current places instead of all filtered places */}
          {currentPlaces.map((place) => (
            <PlaceCard key={place.name}>
              <h2>{place.name}</h2>
              <PlaceImage src={place.image} alt={place.name} />
              <p>{place.description}</p>
              <p>평점: {"⭐".repeat(Number(place.rating))}</p>
              <p>추천 계절: {place.season.join(", ")}</p>
              <p>관광지 물가: {place.cost}</p>
            </PlaceCard>
          ))}
        </ContentBottom>
      </ContentSection>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          disabled={currentPage === 1} // 첫 페이지에서는 "이전" 버튼 비활성화
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          이전
        </button>
        <button
          disabled={endIndex >= filteredPlaces.length} // 마지막 페이지에서는 "다음" 버튼 비활성화
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          다음
        </button>
      </div>
    </Container>
  );
}
