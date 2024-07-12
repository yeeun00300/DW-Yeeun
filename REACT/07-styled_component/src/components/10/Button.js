import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ $kakao }) => ($kakao ? "#fcec58" : "#6500c3")};
  border: none;
  color: ${({ $kakao }) => ($kakao ? "black" : "#fff")};
  padding: 16px;
  font-size: 18px;
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};
  cursor: pointer;
  &:hover {
    background-color: ${({ $kakao }) => ($kakao ? "#857701" : "#7760b4")};
  }
  display: block;
`;

export default Button;
