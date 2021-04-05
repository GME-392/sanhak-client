import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//Animations
import { motion } from "framer-motion";
import {
  sliderContainer,
  slider,
  pageAnimation,
  fade,
  photoAnim,
  lineAnim,
} from "../animation";

const Login = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <Work
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Menu>
        <motion.h2 variants={fade}>로그인</motion.h2>
        <motion.div variants={lineAnim} className="line"></motion.div>
        <div className="login__container">
          <div className="login__input-container">
            <label htmlFor="login__id">아이디</label>
            <Input
              id="login__id"
              placeholder="아이디 또는 이메일을 입력하세요"
            ></Input>
            <label htmlFor="login__pw">비밀번호</label>
            <Input
              id="login__pw"
              type="password"
              placeholder="비밀번호를 입력하세요"
            ></Input>
          </div>
          <div className="login__button">
            <Link to="/forgot">
              <div className="login__forgot">아이디/비밀번호를 잊으셨나요?</div>
            </Link>
            <div className="login__auto-container">
              <input id="login__auto" type="checkbox" />
              <label htmlFor="login__auto">자동 로그인</label>
            </div>
            <button>로그인</button>
          </div>
        </div>
      </Menu>
    </Work>
  );
};

const Work = styled(motion.div)`
  overflow: hidden;
  padding: 5rem 10rem;
  @media (max-width: 900px) {
    padding: 2rem 2rem;
  }

  h2 {
    padding: 1rem 0rem;
  }
`;
const Menu = styled(motion.div)`
  padding-bottom: 10rem;

  .line {
    height: 0.5rem;
    background: #40368a;
    margin-bottom: 3rem;
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;
const Hide = styled.div`
  overflow: hidden;
`;

const Input = styled.input`
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 1rem;
  width: 100%;
`;

export default Login;
