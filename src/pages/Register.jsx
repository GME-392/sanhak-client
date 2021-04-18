import React, { createContext, useState, useEffect } from "react";
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";

import RegisterTerm from "../components/RegisterTerm/RegisterTerm";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export const TermContext = createContext();

const Register = () => {
  const [termAChecked, setTermAChecked] = useState(false);
  const [termBChecked, setTermBChecked] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const checkTermsAllChecked = () => {
    if (termAChecked === true && termBChecked === true) {
      setShowRegisterForm(true);
    }
  };

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
          <TermContext.Provider
            value={{
              termAChecked: termAChecked,
              termBChecked: termBChecked,
              setTermAChecked: setTermAChecked,
              setTermBChecked: setTermBChecked,
              checkTermsAllChecked: checkTermsAllChecked,
            }}
          >
            <Container className="Container">
              <h3 className="Register-text">회원가입</h3>
              {showRegisterForm ? <RegisterForm /> : <RegisterTerm />}
            </Container>
          </TermContext.Provider>
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

const Work = styled(motion.div)`
  min-height: 100vh;
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
