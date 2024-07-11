import React from "react";
import Wrapper from "./Wrapper";
import Input from "./Input";

import styled from "styled-components";

const Container = styled.div`
  width: 30%;
  height: 20%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// const Container = styled.div`
//   width: 400px;
//   margin: 0 auto;
//   ${Input}{
//     display: block;
//     width: 100%;
//     margin: 8px 0 16px;
//     box-sizing: border-box; }
// `;

export default Container;

export function Practice(props) {
  return (
    <Wrapper>
      <Container>
        <h1>로그인</h1>
        <label htmlFor="email">Email</label>
        <Input type="text" id="email" placeholder="styled@DW.js" />
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" placeholder="비밀번호" />
      </Container>
    </Wrapper>
  );
}
