/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import styled from "@emotion/styled";

interface Place {
  name: string;
  season: string[];
  rating: string;
  cost: "저렴" | "보통" | "비싼";
}

const placesData: Place[] = [
  { name: "장소1", season: ["봄", "여름"], rating: "5", cost: "저렴" },
  { name: "장소2", season: ["여름"], rating: "4", cost: "보통" },
  { name: "장소3", season: ["가을", "겨울"], rating: "3", cost: "비싼" },
];

// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const FilterSection = styled.div`
  margin-bottom: 1em;
`;

const Label = styled.label`
  margin-right: 0.5em;
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
        추천 계절:
        {["봄", "여름", "가을", "겨울"].map((s) => (
          <Label key={s}>
            <input
              type="checkbox"
              value={s}
              onChange={handleCheckboxChange(setSelectedSeasons)}
            />
            {s}
          </Label>
        ))}
      </FilterSection>

      <div>
        평점:
        {[1, 2, 3, 4, 5].map((r) => (
          <label key={r.toString()}>
            <input
              type="checkbox"
              value={r.toString()}
              onChange={handleCheckboxChange(setSelectedRatings)}
            />
            {r}
          </label>
        ))}
      </div>

      <div>
        관광지 물가:
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
      </div>

      {/* Render filtered places */}
      {filteredPlaces.map((place) => (
        <p key={place.name}>{place.name}</p>
      ))}
    </Container>
  );
}
