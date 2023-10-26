/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

interface TravelButtonProps {
  name: string;
  destination: string;
  bgImage: string; // 배경 이미지 URL 추가
}

const Button = styled.button<{ bgImage: string }>`
  // bgImage 속성 추가
  padding: 5px;
  margin: 10px;
  color: white;

  /* 여기에 원하는 스타일 적용 */

  &:hover {
    background-color: #ffa07a;
    transform: scale(1.1);
    transition-duration: 0.5s;

    /* hover 상태에서의 애니메이션 등의 스타일 적용 */
  }

  // 버튼이 화면 전체를 차지하도록 설정
  width: 40vw; // 화면 너비의 40%만큼 차지하도록 설정
  height: 45vh; // 화면 높이의 45%만큼 차지하도록 설정

  border-radius: 30px; // 버튼 모서리 둥글게 설정

  background-image: url(${(props) => props.bgImage}); // 배경 이미지 URL 입력
  background-size: cover; // 배경 사진 크기 조절 (화면에 맞춤)
  background-repeat: no-repeat;
  background-position: center center;

  color: white; /* 텍스트 색상 변경 */
  font-size: 2em; /* 텍스트 크기 변경 */
  text-shadow: -1px -1px #000, -2px -2px #000, -3px -3px #000, -4px -4px #000; /* 텍스트 주변에 그림자 추가로 대조도 향상 */
`;
const TravelButton = ({
  name,
  destination,
  bgImage,
}: TravelButtonProps): JSX.Element => {
  const router = useRouter(); // <-- 여기서 훅 호출
  const handleClick = (): void => {
    if (destination.startsWith("http")) {
      window.open(destination, "_blank"); // 새 탭에서 열기
    } else {
      void router.push(destination); // <-- 내부 경로 변경
    }
  };

  return (
    <Button onClick={handleClick} bgImage={bgImage}>
      {name}
    </Button>
  );
};

const regions = [
  {
    name: "서울",
    destination: "./seoul",
    bgImage:
      "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1280,w_1280/7fec9212-16d5-43eb-bb62-ec54ac9e41ac.jpeg",
  },
  {
    name: "경기도",
    destination: "/gyeonggi",
    bgImage:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/3d/53/09/caption.jpg?w=1200&h=-1&s=1",
  },
  {
    name: "충청도",
    destination: "/chungcheong",
    bgImage:
      "https://cdn.cctoday.co.kr/news/photo/202008/2086461_544393_5039.jpg",
  },

  {
    name: "전라도",
    destination: "/chungcheong",
    bgImage:
      "https://tour.jb.go.kr/attachfiles/ctnt/20220415/20220415155310964.jpg",
  },

  {
    name: "경상도",
    destination: "/chungcheong",
    bgImage:
      "https://img.khan.co.kr/news/2023/03/30/l_2023033101001237400113571.jpg",
  },

  {
    name: "강원도",
    destination: "/chungcheong",
    bgImage:
      "https://blog.kakaocdn.net/dn/bQK6wJ/btr8LKB6apR/kx3zGQzNPkmlIc87m9Kd51/img.jpg",
  },

  {
    name: "제주도",
    destination: "/chungcheong",
    bgImage:
      "https://p4.wallpaperbetter.com/wallpaper/764/944/943/5bd2fd9b7d735-wallpaper-preview.jpg",
  },

  {
    name: "해외",
    destination: "/chungcheong",
    bgImage:
      "https://on-nuri.co.kr/wp-content/uploads/kboard_attached/3/202105/609dc718b60955976070.jpg",
  },
];

// FullScreenDiv로 이름 변경하고 배경 이미지 추가
const FullScreenDiv = styled.div`
  display: flex;
  flex-direction: row; // 가로 방향으로 나열
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; // 요소들이 컨테이너를 벗어날 경우 줄바꿈 허용
`;

export default function TravelButtons(): JSX.Element {
  return (
    <FullScreenDiv>
      {regions.map((region) => (
        <TravelButton key={region.name} {...region} />
      ))}
    </FullScreenDiv>
  );
}
