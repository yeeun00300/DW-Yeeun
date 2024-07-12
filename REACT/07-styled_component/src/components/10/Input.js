import styled from "styled-components";

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #ededed;
  outline: none;
  font-size: 16px;
  padding: 8px 0;
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};
  &:focus {
    border-bottom: 2px solid #6500c3;
  }
  &::placeholder {
    color: #ededed;
  }
`;

export default Input;
