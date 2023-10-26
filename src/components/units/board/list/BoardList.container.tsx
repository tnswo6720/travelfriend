import BoardListUI from "./BoardList.presenter";
import axios from 'axios';
import { useRouter } from "next/router";
import { useState, type MouseEvent, useEffect } from "react";

export default function BoardList(): JSX.Element {
  // 라우팅을 위한 hook
  const router = useRouter();

  // 상태 관리: 게시글 데이터 저장
  const [data, setData] = useState<any | null>(null);

  // 컴포넌트가 마운트될 때 실행되는 hook (API 호출을 위한 로직 포함)
  useEffect(() => {
    // axios를 사용하여 API 호출
    axios.get('http://localhost:8080/api/posts')
      .then(response => {
        // 디버깅을 위한 로그: API 호출이 성공했을 때의 응답 확인
        console.log("axios 호출 성공 시 응답 확인:", response.data);

        // 받아온 데이터를 상태에 저장
        setData({ fetchBoards: response.data });

        // 디버깅을 위한 로그: setData 함수가 제대로 호출되었는지와 데이터 확인
        console.log("setData 호출 확인:", { fetchBoards: response.data });

        // 정상적으로 데이터를 가져왔음을 사용자에게 알림
        // alert("정상호출 완료");
      })
      .catch(error => {
        // 오류 발생 시 콘솔에 오류 메시지 출력
        console.error("There was an error fetching the boards data:", error);
      });
  }, []);

  // 새 게시글 작성 페이지로 이동하는 함수
  const onClickMoveToBoardNew = (): void => {
    void router.push("/boards/new");
  };

  // 특정 게시글의 상세 페이지로 이동하는 함수
  const onClickMoveToBoardDetail = (event: MouseEvent<HTMLDivElement>): void => {
    void router.push(`/boards/${event.currentTarget.id}`);
  };

  return (
    // UI 컴포넌트 렌더링. 데이터와 이벤트 핸들러 전달
    <BoardListUI
      data={data}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
    />
  );
}
