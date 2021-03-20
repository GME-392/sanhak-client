import React from "react";
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
            <input
              id="login__id"
              placeholder="아이디 또는 이메일을 입력하세요"
            ></input>
            <label htmlFor="login__pw">비밀번호</label>
            <input id="login__pw" placeholder="비밀번호를 입력하세요"></input>
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
  min-height: 100vh;
  overflow: hidden;
  padding: 5rem 10rem;
  @media (max-width: 1300px) {
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

//Frame Animation
const Frame1 = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 10%;
  width: 100%;
  height: 100vh;
  background: #fffebf;
  z-index: 2;
`;
const Frame2 = styled(Frame1)`
  background: #ff8efb;
`;
const Frame3 = styled(Frame1)`
  background: #8ed2ff;
`;
const Frame4 = styled(Frame1)`
  background: #8effa0;
`;
export default Login;
