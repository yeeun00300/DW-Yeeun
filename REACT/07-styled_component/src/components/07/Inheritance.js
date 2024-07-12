import React from "react";
import TermsOfService from "./TermsOfService";
import Button from "./Button";
import styled from "styled-components";

const StyledTermsOfService = styled(TermsOfService)`
  background-color: #ededed;
  margin: 40px auto;
  width: 420px;
  padding: 16px;
  border-radius: 8px;
`;

const SubmitButton = styled(Button)`
  background-color: #de117d;
  width: 200px;
  margin: 0 auto;
  display: block;
  &:hover {
    background-color: #f5070f;
  }
`;

function Inheritance(props) {
  return (
    <div>
      <StyledTermsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </div>
  );
}

export default Inheritance;
