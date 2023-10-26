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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [seasons, setSeasons] = useState<Record<Season, boolean>>({
    spring: false,
    summer: false,
    fall: false,
    winter: false,
  });

  const handleSeasonChange = (season: Season): void => {
    setSeasons((prev) => ({ ...prev, [season]: !prev[season] }));
  };

  return (
    <div>
      <h2>여행 리뷰 작성</h2>

      <label>
        제목:
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
      </label>

      {/* Add the modules prop here */}
      <ReactQuill
        className={styles.myImage}
        theme="snow"
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        modules={modules}
      />

      <Rate
        count={5}
        value={rating}
        onChange={(newRating: number) => {
          setRating(newRating);
        }}
      />
      <br></br>

      {(["봄", "여름", "가을", "겨울"] as unknown as Season[]).map((season) => (
        <label key={season}>
          {season}
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
          console.log(title, content, rating);
        }}
      >
        Submit
      </button>
    </div>
  );
}
