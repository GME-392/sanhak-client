import React, { useContext, useState } from "react";
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import Term from "../../components/Terms/Term";
import { Button } from "react-bootstrap";
import { TermContext } from "../../pages/Register";
import { termContentA, termContentB } from "../../termContent";

const RegisterTerm = () => {
  const {
    termAChecked,
    termBChecked,
    setTermAChecked,
    setTermBChecked,
    checkTermsAllChecked,
  } = useContext(TermContext);

  return (
    <>
      <TermContainer>
        <Term
          termContent={termContentA}
          termId={"termA"}
          termAChecked={termAChecked}
          setTermAChecked={setTermAChecked}
        ></Term>
        <Term
          termContent={termContentB}
          termId={"termB"}
          termBChecked={termBChecked}
          setTermBChecked={setTermBChecked}
        ></Term>
      </TermContainer>
      <Button
        onClick={checkTermsAllChecked}
        disabled={termAChecked && termBChecked ? false : true}
        className="Register-button"
      >
        다음으로 넘어가기
      </Button>
    </>
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
  @media (max-width: 900px) {
    padding: 2rem 2rem;
  }

  h2 {
    padding: 1rem 0rem;
  }
`;

export default RegisterTerm;
