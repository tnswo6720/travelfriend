import React, { useState } from "react";
import styled from "@emotion/styled";

const Page = styled.div`
  background-color: #3fb6a8;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.div`
  width: 540px;
  height: auto; // changed to auto to fit content
  padding: 2em; // added padding
  background-color: #ffffff; // white color for contrast with page background
  box-shadow: 0px 0.5rem 0.5rem rgba(0, 0, 0, 0.2); // shadow for depth
`;

const Section = styled.div`
  border-top: solid #3fb6a8;
  padding: 0.5em;
`;

const Button = styled.button`
  background-color: #3fb6a8;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.7em;
`;

const Input = styled.input`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export default function App(): JSX.Element {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Page>
      <Profile>
        <h1>이용자 개인정보 수정</h1>

        {/* ID */}
        <Section>
          <h2>닉네임</h2>
          <Input type="text" value={id} onChange={handleIdChange} />
          {
            <Button
              onClick={() => {
                console.log(`Updated id to ${id}`);
              }}
            >
              update
            </Button>
          }
        </Section>

        {/* Password */}
        <Section>
          <h2>비밀번호</h2>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {
            <Button
              onClick={() => {
                console.log(`Updated password to ${password}`);
              }}
            >
              update
            </Button>
          }
        </Section>

        {/* Email */}
        <Section>
          <h2>이메일</h2>
          <p>
            juliepark123@gmail.com<Button>update</Button>
          </p>
        </Section>

        {/* Gender */}
        <Section>
          <h2>Gender</h2>
          <p>Female</p>
        </Section>
      </Profile>
    </Page>
  );
}
