import React, { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import styled from "@emotion/styled";

// ... 나머지 import 구문 ...

const Body = styled.div`
  overflow: hidden;
  height: 1000px;
  background: url("https://blog.kakaocdn.net/dn/sZ7ux/btqDSzwx1NN/c0FYKBDM9WacVK61NpYar1/img.jpg");
  margin: 0px;
  font-family: "Ubuntu", sans-serif;
  background-size: 100% 110%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a {
    margin: 0;
    padding: 0;
  }
`;

const Login = styled.div`
  // 원하는 스타일을 적용하세요.
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
  height: 90vh;
`;

const LoginHeader = styled.div`
  // 원하는 스타일을 적용하세요.
  color: #fff;
  text-align: center;
  font-size: 300%;
`;

const LoginForm = styled.div`
  // 원하는 스타일을 적용하세요.
  border: 0.5px solid #fff;
  background: #722ed117;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #000;
  box-sizing:border-box;
  padding-top:15px;
  padding-bottom:10%;
  margin:5% auto;
  text-align:center;
  width: 350px;
  height: 350px;

  h3 {
    text-align: left;
    margin-left: 40px;
    color: #fff;

    @media only screen and (min-width : 500px) and (max-width : 600px){
      h3 {
        text-align:center;
        margin:0;
      }
      .sign-up, .no-access {
        margin:10px 0;
      }
      .login-button {
        margin-bottom:10px;
      }
    }
`;

const Input = styled.input`
  max-width: 400px;
  width: 80%;
  line-height: 3em;
  font-family: "Ubuntu", sans-serif;
  margin: 1em 2em;
  border-radius: 5px;
  border: 2px solid #f2f2f2;
  outline: none;
  padding-left: 10px;

  &[type="password"],
  &[type="text"] {
    outline: none;
    padding-left: 10px;
  }
`;

const LoginButton = styled.input`
  // 원하는 스타일을 적용하세요.
  height: 30px;
  width: 100px;
  background: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  color: slategrey;
  text-transform: uppercase;
  font-family: "Ubuntu", sans-serif;
  cursor: pointer;

  &[type="button"] {
    cursor: pointer;
  }
`;

const SignUpLink = styled.a`
  color: #f2f2f2;
  margin-left: -70%;
  cursor: pointer;
  text-decoration: underline;
`;

const NoAccessLink = styled.h6`
  // 원하는 스타일을 적용하세요.
  color: #e86850;
  margin: 20px 0px 20px -57%;
  text-decoration: underline;
  cursor: pointer;
`;

// const ErrorPage = styled.div`
//   // 원하는 스타일을 적용하세요.
//   color: #f2f2f2;
//   text-decoration: underline;
//   cursor: pointer;
// `;
// function setCookie(name, value, days) {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// }

export default function LoginPage(): JSX.Element {
  const [userid, setUserid] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserid(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // 서버에 로그인 요청
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          userid: userid,
          password: password,
        }
      );

      if (response.status === 200) {
        console.log("로그인 성공.");

        localStorage.setItem("authToken", response.data.token);

        // window.location.href = "http://localhost:3000"; // 로그인 성공 시 리다이렉트
      } else {
        throw new Error("로그인 실패.");
      }
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      // 세션 ID를 삭제
      // setCookie("sessionId", "", -1); // 쿠키를 삭제하기 위해 음수 값 설정

      const authToken = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기

      const response = await axios.post(
        "http://localhost:8080/api/users/logout",
        null,
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `Bearer ${authToken}`, // JWT 토큰을 헤더에 추가
          },
        }
      );

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("authToken");

      if (response.status === 200) {
        console.log("로그아웃 성공.");
        window.location.href = "http://localhost:3000"; // 로그아웃 성공 시 리다이렉트
      } else {
        throw new Error("로그아웃 실패.");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <Body>
      <Login>
        <LoginHeader>
          <h1>Login</h1>
        </LoginHeader>
        <LoginForm>
          <h3>Username:</h3>
          <Input
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
          />

          <h3>Password:</h3>
          <Input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <br />
          {/* LoginButton의 클릭 이벤트 핸들러로 handleSubmit 함수를 설정 */}
          <LoginButton type="button" value="Login" onClick={handleSubmit} />
          <br />
          <SignUpLink>Sign Up!</SignUpLink>
          <br />

          <NoAccessLink> Can't access your account?</NoAccessLink>

          {/* // 로그아웃 버튼 예제 */}
          <button onClick={handleLogout}>Logout</button>
        </LoginForm>

        {/* You can add the ErrorPage component here when you need it */}
      </Login>
    </Body>
  );
}
