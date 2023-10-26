import React, { useState } from "react";
import type { ChangeEvent } from "react";

interface Place {
  name: string;
  season: "spring" | "summer" | "fall" | "winter";
  rating: string;
  cost: "low" | "medium" | "high";
}

const placesData: Place[] = [
  { name: "Place1", season: "spring", rating: "5", cost: "low" },
  { name: "Place2", season: "summer", rating: "4", cost: "medium" },
  { name: "Place3", season: "fall", rating: "3", cost: "high" },
];

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
        selectedSeasons.includes(place.season)) &&
      (selectedRatings.length === 0 ||
        selectedRatings.includes(place.rating)) &&
      (selectedCosts.length === 0 || selectedCosts.includes(place.cost))
  );

  return (
    <div>
      <div>
        Season:
        {["spring", "summer", "fall", "winter"].map((s) => (
          <label key={s}>
            <input
              type="checkbox"
              value={s}
              onChange={handleCheckboxChange(setSelectedSeasons)}
            />
            {s}
          </label>
        ))}
      </div>

      <div>
        Rating:
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
        Cost:
        {["low", "medium", "high"].map((c) => (
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
    </div>
  );
}
