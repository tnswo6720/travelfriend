import WeatherComponent from "../../../../../pages/Weather";

import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  LogoAndTitleWrapper,
  SiteTitle,
  Wrapper,
} from "./LayoutHeader.styles";
import type { ILayoutHeaderProps } from "./LayoutHeader.types";

export default function LayoutHeaderUI(props: ILayoutHeaderProps): JSX.Element {
  return (
    <Wrapper>
      <InnerWrapper>
        <LogoAndTitleWrapper>
          <InnerLogo onClick={props.onClickLogo}>
            <img
              src="/travelfriendd.png"
              alt="여행친구"
              style={{ width: "100px", height: "100px" }}
            />{" "}
          </InnerLogo>
          <SiteTitle onClick={props.onClickMainPage}>
            {" "}
            {/* '여행친구' 텍스트에 클릭 이벤트를 추가 */}
            <span className="red">여</span>
            <span className="orange">행</span>
            <span className="blue">친</span>
            <span className="black">구</span>
          </SiteTitle>
        </LogoAndTitleWrapper>

        <div>
          <InnerButton onClick={props.onClickMoveToLogin}>로그인</InnerButton>
          <InnerButton onClick={props.onClickMovetoSignUp}>
            회원가입
          </InnerButton>
        </div>
      </InnerWrapper>
      <WeatherComponent />
    </Wrapper>
  );
}
