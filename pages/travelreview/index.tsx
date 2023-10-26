import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { Rate } from "antd";
import dynamic from "next/dynamic";
import styles from "../../styles/Travel.module.css";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
type Season = "spring" | "summer" | "fall" | "winter";

// Add the toolbar options
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ["small", false, "large", "huge"] }],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    ["link", "image"], // Add the image button here
  ],
};

export default function TravelReviewForm(): JSX.Element {
  const [TravelName, setTravelName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [seasons, setSeasons] = useState<Record<Season, boolean>>({
    spring: false,
    summer: false,
    fall: false,
    winter: false,
  });

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleSeasonChange = (season: Season): void => {
    setSeasons((prev) => ({ ...prev, [season]: !prev[season] }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // viewport height, you may need to adjust this
      }}
    >
      <h2>여행 리뷰 작성</h2>
      <label>
        여행지 이름:
        <input
          type="text"
          value={TravelName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTravelName(e.target.value);
          }}
        />
      </label>
      <br></br>
      여행 지역을 선택하세요
      <div>
        <br></br>
        {[
          "서울",
          "경기도",
          "충청도",
          "경상도",
          "강원도",
          "전라도",
          "제주도",
          "해외",
        ].map((region) => (
          <label key={region}>
            {region}
            <input
              type="radio"
              name="region"
              value={region}
              checked={selectedRegion === region}
              onChange={() => {
                setSelectedRegion(region);
              }}
            />
          </label>
        ))}
      </div>
      {/* Add the modules prop here */}
      <div className={styles.editorContainer}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => {
            setContent(value);
          }}
          modules={modules}
          style={{ height: "400px" }} // Add this line
        />
      </div>
      여행지에 대한 평점을 먜겨주세요
      <Rate
        count={5}
        value={rating}
        onChange={(newRating: number) => {
          setRating(newRating);
        }}
      />
      <br></br>
      해당 여행지는 어느 계절에 여행가면 좋을까요?
      {(["spring", "summer", "fall", "winter"] as Season[]).map((season) => (
        <label key={season}>
          {season === "spring"
            ? "봄"
            : season === "summer"
            ? "여름"
            : season === "fall"
            ? "가을"
            : season === "winter" && "겨울"}
          <input
            type="checkbox"
            checked={!!seasons[season]}
            onChange={() => {
              handleSeasonChange(season);
            }}
          />
        </label>
      ))}
      {/* Submit button */}
      {/* You would need to implement the onSubmit logic yourself */}
      <button
        onClick={() => {
          console.log(TravelName, content, rating, seasons);
        }}
      >
        글 작성하기
      </button>
    </div>
  );
}
