/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const placesData: Place[] = [
  // 10개의 장소 데이터를 추가했습니다.
  {
    name: "경복궁",
    season: ["봄", "여름"],
    rating: "5",
    cost: "저렴",
    image:
      "https://a.cdn-hotels.com/gdcs/production75/d1444/e66988b1-f783-4e8f-a7ea-8c5eebe88436.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    description: "경희루가 특히 아름답습니다.",
  },
  {
    name: "한옥마을",
    season: ["여름"],
    rating: "4",
    cost: "보통",
    image:
      "https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg",
    description: "고풍스럽네요",
  },
  {
    name: "넥슨 본사",
    season: ["가을", "겨울"],
    rating: "3",
    cost: "비싼",
    image:
      "https://www.bizhankook.com/upload/bk/article/201902/thumb/17246-37122-sampleM.jpg",
    description: "강원기 디렉터 봤어요",
  },
  // 아래는 예시용 데이터입니다. 실제로는 각 장소에 맞는 데이터를 넣어주세요.
  {
    name: "장소4",
    season: ["봄"],
    rating: "5",
    cost: "보통",
    image: "https://via.placeholder.com/150",
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
  justify-content: center;
  padding: 0px;
  background-color: #e6e6fa; // 연한 보라색 배경 적용
  height: 150vh; // 페이지 전체 높이를 늘립니다.
  width: 220vh;
`;

const commonLabelStyle = `
  display: block;
  margin-bottom: 10px;
  font-size: 18px; // 더 큰 텍스트 크기로 설정

  &:hover {
    color: #800080; // hover 시 텍스트 색상 변경
  }
`;

const FilterContainer = styled.div`
  background-color: #fff; // 하얀색 배경 적용
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FilterSection = styled.div`
  flex: 1;
  margin-right: 2em;
  padding: 20px;
  border-right: 1px solid #ccc;
  height: 100vh;
  overflow-y: auto;
  color: #4b0082; // 체크박스와 텍스트에 보다 진한 보라색 적용
  font-size: 20px; // 텍스트 크기를 16px로 설정
  width: 104%;

  label {
    ${commonLabelStyle}
  }

  &:hover {
    color: #800080; // hover 시 텍스트 색상 변경
    transition: color 0.3s ease; // 색상 변경을 부드럽게
  }
`;
const Label = styled.label`
  ${commonLabelStyle}
`;
const ContentSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column; // 세로 방향으로 정렬
  width: 80%;
  height: fit-content; // 높이를 콘텐츠에 맞게 조절
`;
const ContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0px;
  border-bottom: 1px solid #ccc;
  height: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // 버튼 사이에 공간 배치
  padding: 0px;

  button {
    background-color: #9370db; // 버튼 배경색을 보라색 계열로
    color: #ffffff; // 버튼 텍스트를 흰색으로
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease; // 배경색 변경을 부드럽게

    &:hover {
      background-color: #4b0082; // hover 시 배경색 변경
    }

    &:disabled {
      background-color: #d8bfd8; // 비활성화된 버튼의 배경색을 연한 보라색으로
      cursor: not-allowed;
    }
  }
`;
const ContentBottom = styled.div`
  display: flex;
  flex: 2;
  // flex-wrap: nowrap; // 컨텐츠가 넘칠 경우 다음 줄로 넘기지 않습니다.
  flex-wrap: wrap; // 컨텐츠가 넘칠 경우 다음 줄로 넘깁니다.
  padding: 20px;
  // overflow-x: auto; // 오른쪽으로 스크롤하는 문제 해결
  overflow-x: hidden; // 오른쪽으로 스크롤이 되지 않도록 설정
  max-width: 100%; // 컨텐츠의 너비를 제한
`;

const PlaceCard = styled.div`
  flex: 1 0 auto; // flex-grow를 0으로 설정하여 콘텐츠 크기에 따라 카드 크기가 변하도록 합니다.
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s; // hover 효과를 위한 transition 추가

  &:hover {
    transform: scale(1.05); // hover 시 카드를 약간 확대
  }
`;

const PlaceImage = styled.img`
  width: 140px; /* 이미지 너비 설정 */
  height: 140px; /* 이미지 높이 설정 */
  border-radius: 10px;
  object-fit: cover; /* 이미지 비율 유지 */
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// async function fetchData() {
//   const response = await fetch("API_URL", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // 여기에 필요한 데이터를 넣어줍니다.
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//   return data;
// }
export default function TravelFilter(): JSX.Element {
  // const [placesData, setPlacesData] = useState<Place[]>([]);

  // useEffect(() => {
  //   fetchData()
  //     .then((data) => {
  //       setPlacesData(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number>(0);
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleCheckboxChange =
    <T extends number | string[]>(
      setSelectedFunc: React.Dispatch<React.SetStateAction<T>>
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked
        ? (Number(event.target.value) as T)
        : (0 as T);
      setSelectedFunc(value);
    };

  const filteredPlaces = placesData.filter(
    (place) =>
      (selectedSeasons.length === 0 ||
        selectedSeasons.some((season) => place.season.includes(season))) &&
      (selectedRatings === 0 || Number(place.rating) >= selectedRatings) &&
      (selectedCosts.length === 0 || selectedCosts.includes(place.cost))
  );

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentPlaces = filteredPlaces.slice(startIndex, endIndex);

  return (
    <Container>
      <FilterContainer>
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
              <input
                type="radio"
                name="rating"
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
      </FilterContainer>

      <ContentSection>
        <ContentTop>
          {/* 이 공간에 새로운 콘텐츠를 띄우세요 */}

          <ButtonContainer>
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
          </ButtonContainer>
        </ContentTop>
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

        {/* 구분  */}

        <ContentTop>{/* 이 공간에 새로운 콘텐츠를 띄우세요 */}</ContentTop>
        <ContentBottom>
          {/* Render current places instead of all filtered places */}
        </ContentBottom>
      </ContentSection>
    </Container>
  );
}
