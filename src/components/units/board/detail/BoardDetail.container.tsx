import axios from 'axios'; // axios를 가져옵니다.
import { useEffect, useState } from 'react'; // React Hook을 가져옵니다.
import { useRouter } from 'next/router'; // Next.js의 라우터를 가져옵니다.
import BoardDetailUI from "./BoardDetail.presenter"; // 게시판 디테일 UI 컴포넌트를 가져옵니다

export default function BoardDetail() {
  const router = useRouter(); // Next.js 라우터를 초기화합니다.
  const { boardId } = router.query; // 라우터에서 boardId를 추출합니다.

  // data 상태를 관리합니다. 초기값은 null이며, 나중에 API 응답으로 업데이트됩니다.
  // useState의 제네릭을 사용하여 data의 타입을 명시적으로 지정합니다.
  const [data, setData] = useState(null);

  // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출을 수행합니다.
  useEffect(() => {
    // boardId가 문자열인지 확인합니다. 문자열이 아니면 API 호출을 스킵합니다.
    if (typeof boardId === 'string') {
      // axios를 사용하여 API를 호출하고, 응답을 상태로 설정합니다.
      axios.get(`http://localhost:8080/api/posts/view/${boardId}`)
        .then((response) => {
          // API 응답을 받아 data 상태를 업데이트합니다.
          setData(response.data);
        })
        .catch((error) => {
          // API 호출 중 오류가 발생하면 콘솔에 오류를 출력합니다.
          console.error('게시물을 불러오는 중 에러 발생:', error);
        });
    }
  }, [boardId]); // boardId가 변경될 때마다 useEffect가 다시 실행됩니다.

  // 게시글을 편집하는 페이지로 이동하는 함수입니다.
  const onClickMoveToBoardEdit = () => {
    // boardId가 유효한 문자열인지 확인합니다.
    if (typeof boardId === 'string') {
      // 유효하다면, 게시글 편집 페이지로 이동합니다.
      router.push(`/boards/${boardId}/edit`);
    } else {
      // 유효하지 않다면, 사용자에게 알림을 표시합니다.
      alert('유효하지 않은 게시물 ID입니다.');
    }
  };

  // UI 컴포넌트를 렌더링하고, data와 이벤트 핸들러를 props로 전달합니다.
  return (
    <BoardDetailUI
      data={data ?? undefined} // null이면 undefined 할당
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
    />
  );
}
