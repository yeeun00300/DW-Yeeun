import styled from "styled-components";

const Input = styled.input`
  border: 2px solid #eee;
  border-radius: 4px;
  outline: none;
  padding: 16px;
  &:focus {
    border-color: #7760b4;
  }
  &::placeholder {
    color: gray;
  }
  flex-grow: 1;
`;

export default Input;
