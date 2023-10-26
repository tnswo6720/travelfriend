import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./BoardList.styles";
import type { IBoardListUIProps } from "./BoardList.types"

export default function BoardListUI(props: IBoardListUIProps): JSX.Element {
  return (
    <S.Wrapper> {/* 전체 컴포넌트를 감싸는 Wrapper */}
      <S.TableTop /> {/* 테이블 상단 경계선 */}

      {/* 테이블 헤더 로우 */}
      <S.Row>
        <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.Row>

      {/* 게시판 데이터를 표시하는 로우들. 데이터가 있을 경우 map을 통해 여러 로우 생성 */}
      {props.data?.fetchBoards.map((el) => (
        <S.Row key={el.id}> {/* 각 게시글을 나타내는 로우에 key prop으로 id를 부여 */}
          <S.ColumnBasic>
            {/* 게시글의 ID 마지막 4자리를 대문자로 표시 */}
            {String(el.id).slice(-4).toUpperCase()}
          </S.ColumnBasic>
          <S.ColumnTitle id={el.id} onClick={props.onClickMoveToBoardDetail}>
            {/* 게시글 제목 */}
            {el.title}
          </S.ColumnTitle>
          <S.ColumnBasic>
            {/* 게시글 작성자 */}
            {el.author}
          </S.ColumnBasic>
          <S.ColumnBasic>
            {/* 게시글 작성 날짜 */}
            {getDate(el.createdAt)}
          </S.ColumnBasic>
        </S.Row>
      ))}


      <S.TableBottom /> {/* 테이블 하단 경계선 */}

      <S.Footer> {/* 하단의 푸터 영역 */}
        <S.Button onClick={props.onClickMoveToBoardNew}> {/* 게시글 작성 버튼 */}
          <S.PencilIcon src="/images/board/list/write.png" /> {/* 버튼에 들어갈 아이콘 */}
          게시물 등록하기
        </S.Button>
      </S.Footer>
    </S.Wrapper>
  );
}
