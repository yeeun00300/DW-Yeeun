import React from "react";
import styled from "styled-components";
import nail from "./nail.png";

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
const StyledButton = styled.button`
  background-color: #6750a4;
  border: none;
  color: #fff;
  padding: 16px;
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; */
  & ${Icon} {
    margin-right: 4px;
  }
  &:hover {
    ${Icon} {
      opacity: 0.2;
    }
  }
`;

function Button({ children }) {
  return (
    <StyledButton>
      <Icon src={nail} />
      {children}
    </StyledButton>

    // <StyledButton>
    //   <Icon src={nail} />
    //   <span>Nesting</span>
    // </StyledButton>
  );
}

export default Button;
