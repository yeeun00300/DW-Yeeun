import React from "react";
import styled from "styled-components";
import kakaoImg from "./kakao.svg";
import LoginButton from "./LoginButton";

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledButton = styled(LoginButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  color: rgba(0, 0, 0, 0.8);

  & ${Icon} {
    margin-right: 8px;
  }
`;

function KakaoButton({ children }) {
  return (
    <StyledButton>
      <Icon src={kakaoImg} />
      {children}
    </StyledButton>
  );
}

export default KakaoButton;
