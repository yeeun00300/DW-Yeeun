import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import kakaoImg from "./kakao.svg";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  text-align: center;
  & * {
    margin-bottom: 16px;
    width: 100%;
  }
`;
const Label = styled.label`
  display: block;
  color: #ad9fd2;
  text-align: left;
`;
const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin: 0;
  margin-right: 3px;
`;
const Title = styled.h1`
  background-image: linear-gradient(to right, #3de1fc, #667eea, #000);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

function Login(props) {
  return (
    <Container>
      <Title>DW 온라인스쿨</Title>
      <Container>
        <span>회원이 아니신가요? </span>
        <Link>회원가입 하기</Link>
      </Container>
      <Label htmlFor="email">이메일</Label>
      <Input type="text" placeholder="example @ gmail.com" id="email" />
      <Label htmlFor="password">비밀번호</Label>
      <Input type="password" placeholder="비밀번호" id="password" />
      <Button>로그인 하기</Button>
      <Button $kakao>
        <Icon src={kakaoImg} />
        카카오 로그인
      </Button>
    </Container>
  );
}

export default Login;
