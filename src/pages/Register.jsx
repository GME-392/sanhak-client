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
import { useScroll } from "../components/useScroll";
import ScrollTop from "../components/ScrollTop";
import Term from "../components/Terms/Term";
import { Button } from "react-bootstrap";

const Register = () => {
  return (
    <Work
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Menu>
        <Hide>
          <Container className="Container">
            <h3 className="Register-text">회원가입</h3>
            <TermContainer>
              <Term termContent={"안녕하세요,"} termId={"termA"}></Term>
              <Term termContent={"안녕하세요,"} termId={"termB"}></Term>
            </TermContainer>
            <Button>다음으로 넘어가기</Button>
          </Container>
        </Hide>
      </Menu>
    </Work>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border: 1px solid #cdcdcd;
  height: 80%;
  border-radius: 12px;
  background-color: white;
  font-family: Noto Sans KR;
  padding-bottom: 15px;

  @media (max-width: 768px) {
    width: 100% !important;
    border: none !important;
  }
`;

const TermContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
`;

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
  display: flex;
  justify-content: center;
`;

export default Register;
