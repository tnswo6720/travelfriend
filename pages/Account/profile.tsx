// pages/Account/profile.tsx
import React, { useState } from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #3fb6a8;
  padding: 0.5em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.7em;
`;

const Input = styled.input`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export default function Profile(): JSX.Element {
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
    <div>
      <h1>Personal Info</h1>

      {/* ID */}
      <h2>ID</h2>
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

      {/* Password */}
      <h2>Password</h2>
      <Input type="password" value={password} onChange={handlePasswordChange} />
      {
        <Button
          onClick={() => {
            console.log(`Updated password to ${password}`);
          }}
        >
          update
        </Button>
      }

      {/* Email */}
      <h2>Email</h2>
      <p>
        juliepark123@gmail.com<Button>update</Button>
      </p>

      {/* Gender */}
      <h2>Gender</h2>
      <p>Female</p>
    </div>
  );
}
