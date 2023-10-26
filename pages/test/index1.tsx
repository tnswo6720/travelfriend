import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";

type Season = "봄" | "여름" | "가을" | "겨울" | null;
type CostLevel = "낮음" | "중간" | "높음";

interface TravelSpot {
  id: string;
  name: string;
  popularity: number;
  season: Season[];
  cost: number;
}

export default function TravelPage(): JSX.Element {
  const [travelSpots, setTravelSpots] = useState<TravelSpot[]>([]);

  // 초기 상태를 null로 설정
  const [selectedSeason, setSelectedSeason] = useState<Season>(null);

  // 초기 상태를 null로 설정
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  const [costLevel, setCostLevel] = useState<CostLevel>("낮음");

  useEffect(() => {
    setTravelSpots([
      {
        id: "1",
        name: "서울",
        popularity: 5,
        season: ["봄", "여름", "가을", "겨울"],
        cost: 50000,
      },
      { id: "2", name: "부산", popularity: 4, season: ["여름"], cost: 40000 },
      { id: "3", name: "강릉", popularity: 3, season: ["봄"], cost: 30000 },
      {
        id: "4",
        name: "제주",
        popularity: 2,
        season: ["여름", "겨울"],
        cost: 60000,
      },
      {
        id: "5",
        name: "경주",
        popularity: 1,
        season: ["봄", "가을"],
        cost: 35000,
      },
    ]);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setSelectedSeason(selectedSeason !== "봄" ? "봄" : null);
        }}
      >
        {" "}
        봄{" "}
      </button>
      <button
        onClick={() => {
          setSelectedSeason(selectedSeason !== "여름" ? "여름" : null);
        }}
      >
        {" "}
        여름{" "}
      </button>
      <button
        onClick={() => {
          setSelectedSeason(selectedSeason !== "가을" ? "가을" : null);
        }}
      >
        {" "}
        가을{" "}
      </button>
      <button
        onClick={() => {
          setSelectedSeason(selectedSeason !== "겨울" ? "겨울" : null);
        }}
      >
        {" "}
        겨울{" "}
      </button>

      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={selectedStars ?? 0}
        onStarClick={(nextValue) => {
          console.log("Selected Stars:", nextValue);
          setSelectedStars(nextValue);
        }}
      />

      <button
        onClick={() => {
          setCostLevel("낮음");
        }}
      >
        비용 낮음
      </button>
      <button
        onClick={() => {
          setCostLevel("중간");
        }}
      >
        비용 중간
      </button>
      <button
        onClick={() => {
          setCostLevel("높음");
        }}
      >
        비용 높음
      </button>

      {travelSpots
        .filter(
          (spot) =>
            (selectedSeason !== null
              ? spot.season.includes(selectedSeason)
              : true) &&
            (selectedStars !== null
              ? spot.popularity === selectedStars
              : true) &&
            (costLevel === "낮음"
              ? spot.cost <= 30000
              : costLevel === "중간"
              ? spot.cost > 30000 && spot.cost <= 70000
              : spot.cost > 70000)
        )
        .sort((a, b) => b.popularity - a.popularity)
        .map((spot) => {
          console.log(
            `이름:${spot.name}, 인기도:${spot.popularity}, 비용:${spot.cost}`
          );
          return (
            <div key={spot.id}>
              이름:{spot.name}, 인기도:
              <StarRatingComponent
                name="rate2"
                starCount={5}
                value={spot.popularity}
                editing={false}
              />
              , 비용:{spot.cost}
            </div>
          );
        })}
    </>
  );
}
