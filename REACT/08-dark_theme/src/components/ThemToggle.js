import React from "react";
import styled from "styled-components";

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 9999;
  bottom: 4%;
  right: 3%;
  cursor: pointer;

  background-color: ${({ theme }) => theme.bgColor};
  border: ${({ theme }) => theme.borderColor};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${({ mode }) =>
    mode === "light"
      ? `0 5px 10px rgba(100, 100, 100, 0.15),
    0 2px 4px rgba(100, 100, 100, 0.15)`
      : `0 5px 10px rgba(40, 40, 40, 1),
    0 2px 4px rgba(40, 40, 40, 1)`};
`;

function ThemToggle({ mode, toggleTheme }) {
  //로컬스토리지에 themeMode 저장
  localStorage.setItem("theme", mode);
  const handleClick = () => {
    toggleTheme();
  };

  return (
    <ToggleWrapper onClick={handleClick} mode={mode}>
      {mode === "light" ? "🌞" : "🌛"}
    </ToggleWrapper>
  );
}

export default ThemToggle;
