import React from "react";
import styled, { css } from "styled-components";
import Icon from "./search.png";

const SIZES = {
  large: 24,
  medium: 20,
  small: 16,
};

const fontSize = css`
  font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px;
`;

const Input = styled.input`
  width: 180px;
  border: 2px solid #eeeeee;
  padding: 16px;
  outline: none;
  /* font-size: ${({ size }) => SIZES[size] ?? SIZES["medium"]}px; */
  ${fontSize}
  border-radius: 4px;
  &:focus {
    border-color: #7760b4;
  }
`;

const Search = styled.img`
  width: 16px;
  position: absolute;
  top: 20px;
  left: 16px;
`;

const SearchInput = styled(Input)`
  padding-left: 40px;
  /* background-img: url(./search.png); 
     background-size: 16px;
     background-repeat: no-repeat;
     background-position: left 12px top 50% == 12px 50%
  */
`;

const Container = styled.div`
  position: relative;
`;

export function Practice(props) {
  return (
    <div>
      <h2>Input</h2>
      <Input />
      <h2>Search Input</h2>
      <Container>
        <Search src={Icon} />
        <SearchInput />
      </Container>
    </div>
  );
}
