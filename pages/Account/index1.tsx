import React, { useState } from "react";
import styled from "@emotion/styled";
import DaumPostcodeEmbed from "react-daum-postcode";

const Profile = styled.div`
  float: left;
  width: 50%;
  height: auto;
  padding-left: 10%;
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

interface IData {
  address?: string;
  addressType?: string;
  bname?: string;
  buildingName?: string;
}

export default function App(): JSX.Element {
  const [address, setAddress] = useState<string>("");

  const handleComplete = (data: IData): void => {
    let fullAddress = data.address ?? "";
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== undefined && data.bname !== "") {
        extraAddress += data.bname ?? "";
      }
      if (data.buildingName !== undefined && data.buildingName !== "") {
        extraAddress +=
          (extraAddress !== ""
            ? `, ${data.buildingName}`
            : data.buildingName) ?? "";
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
  };

  return (
    <Profile>
      <h1>Personal Info</h1>
      <h2>Full Name</h2>
      <p>
        Julie Park<Button>update</Button>
      </p>

      <h2>Email</h2>
      <p>
        juliepark123@gmail.com<Button>update</Button>
      </p>

      {/* Address */}
      {<DaumPostcodeEmbed onComplete={handleComplete} />}
      {address.length > 0 && address !== "" && <p>{address}</p>}

      {/* Gender */}
      <h2>Gender</h2>
      <p>Female</p>
    </Profile>
  );
}
