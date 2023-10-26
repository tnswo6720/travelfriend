import React, { type ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { DaumPostcodeEmbed } from "react-daum-postcode";
import type { Address } from "react-daum-postcode";
import axios from "axios";

const Body = styled.div`
  height: 1000px; // 높이를 고정
  overflow: hidden;
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
  height: 600px;

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

const SubmitButton = styled.button`
  // 원하는 스타일을 적용하세요.
  height: 30px;
  width: 100px;
  background: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  color: slategrey;
  text-transform: uppercase;
  font-family: "Ubuntu", sans-serif;
`;
const Error = styled.div`
  color: #9e00ff;
`;

export default function LoginPage(): JSX.Element {
  const [ID, setID] = useState("");
  const [IDError, setIDError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");

  const [address, setAddress] = useState(""); // 주소를 관리할 상태 변수
  const [isOpen, setIsOpen] = useState(false); // 모달의 열림/닫힘을 관리할 상태 변수

  const handleComplete = (data: Address): void => {
    setAddress(data.address);
    console.log(data.address);
    setIsOpen(false);
  };

  const showModal = (): void => {
    setIsOpen(true);
  };

  const handleOk = (): void => {
    setIsOpen(false);
  };

  const handleCancel = (): void => {
    setIsOpen(false);
  };

  const onChangeID = (event: ChangeEvent<HTMLInputElement>): void => {
    setID(event.target.value);
    if (event.target.value !== "") {
      setIDError("");
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      setEmailError("");
    }
  };

  const onClickSubmit = async (): Promise<void> => {
    if (ID === "") {
      setIDError("작성자를 입력해주세요.");
    }
    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (Email === "") {
      setEmailError("이메일을 입력해주세요.");
    }

    // 모든 필드가 채워졌다면, 상태 값을 콘솔에 출력합니다.
    if (ID !== "" && password !== "" && Email !== "") {
      console.log({
        ID,
        password,
        Email,
      });

      try {
        await axios.post("http://localhost:8080/api/users/signup", {
          userid: ID,
          password: password,
          email: Email,
          dateOfBirth: "2023-10-14", // 날짜는 고정값입니다. 필요에 따라 수정하세요.
          gender: null,
          address: address
        });
      } catch (error) {
        console.error("회원가입 실패", error);
      }
    }
  };

  return (
    <Body>
      <Login>
        <LoginHeader>
          <h1>Sign Up</h1>
        </LoginHeader>
        <LoginForm>
          <h3>ID:</h3>
          <Input type="text" placeholder="Username" onChange={onChangeID} />
          <Error>{IDError}</Error>
          <h3>Password:</h3>
          <Input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
          />
          <Error>{passwordError}</Error>
          <br />
          <h3>Email:</h3>
          <Input type="text" placeholder="Email" onChange={onChangeEmail} />
          <Error>{EmailError}</Error>
          <br />
          <h3>Address:</h3>
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onClick={showModal} // 클릭하면 모달이 열립니다.
            readOnly // 주소는 직접 수정하지 못하게 읽기 전용으로 설정합니다.
          />

          {/* 모달 */}
          {isOpen && (
            <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal>
          )}

          <br />
          <SubmitButton onClick={onClickSubmit}>가입하기</SubmitButton>

          <br />

          <br />
        </LoginForm>

        {/* You can add the ErrorPage component here when you need it */}
      </Login>
    </Body>
  );
}
