import * as S from "./BoardDetail.styles";
import { getDate } from "../../../../../src/commons/libraries/utils";
import type { IBoardDetailUIProps } from "./BoardDetail.types";
import { Tooltip } from "antd";

export default function BoardDetailUI(props: IBoardDetailUIProps): JSX.Element {
  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.AvatarWrapper>
            <S.Avatar src="/images/avatar.png" />
            <S.Info>
              <S.Writer>{props.data?.author}</S.Writer> {/* 작성자 정보 */}
              <S.CreatedAt>{getDate(props.data?.createdAt)}</S.CreatedAt> {/* 작성일 정보 */}
            </S.Info>
          </S.AvatarWrapper>
          <S.IconWrapper>
            <S.LinkIcon src="/images/board/detail/link.png" />
            <Tooltip>
              <S.LocationIcon src="/images/board/detail/location.png" />
            </Tooltip>
          </S.IconWrapper>
        </S.Header>
        <S.Body>
          <S.Title>{props.data?.title}</S.Title> {/* 제목 정보 */}
          <S.Contents dangerouslySetInnerHTML={{ __html: props.data?.contents || '' }}></S.Contents>


          {props.data?.youtubeUrl !== "" && (
            <S.Youtube
              url={props.data?.youtubeUrl ?? ""}
              width="486px"
              height="240px"
            />
          )}
        </S.Body>
      </S.CardWrapper>
      <S.BottomWrapper>
        <S.Button>목록으로</S.Button>
        <S.Button onClick={props.onClickMoveToBoardEdit}>수정하기</S.Button>
        <S.Button>삭제하기</S.Button>
      </S.BottomWrapper>
    </S.Wrapper>
  );
}
