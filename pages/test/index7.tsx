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
];

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
`;

const FilterSection = styled.div`
  margin-right: 2em;
`;

const Label = styled.label`
  display: block;
`;

const ContentSection = styled.div``;

const PlaceCard = styled.div`
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 1em;
`;

export default function TravelFilter(): JSX.Element {
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

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
        {/* Render filtered places */}
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.name}>
            <h2>{place.name}</h2>
            <img src={place.image} alt={place.name} />
            <p>{place.description}</p>
            <p>평점: {"⭐".repeat(Number(place.rating))}</p>
            <p>추천 계절: {place.season.join(", ")}</p>
          </PlaceCard>
        ))}
      </ContentSection>
    </Container>
  );
}
