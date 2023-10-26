import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 70px;
  background-color: #f5f2fc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SiteTitle = styled.h3`
  .red {
    color: red;
    transition: 0.5s;
    &:hover {
      color: purple;
    }
  }
  .orange {
    color: orange;
    transition: 0.5s;
    &:hover {
      color: purple;
    }
  }
  .blue {
    color: blue;
    transition: 0.5s;
    &:hover {
      color: purple;
    }
  }
  .yellow {
    color: #ffd700;
    transition: 0.5s;
    &:hover {
      color: purple;
    }
  }
`;

export const InnerWrapper = styled.div`
  width: 1400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

export const InnerLogo = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: "live";
  font-style: italic;
  color: #5729ff;
  cursor: pointer;
`;

export const h1 = styled.div``;

export const InnerButton = styled.span`
  margin: 10px;
  color: #5729ff;
  cursor: pointer;
`;
