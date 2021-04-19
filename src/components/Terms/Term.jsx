import React, { useContext } from "react";
import styled from "styled-components";
import "./Term.scss";

const Term = ({ termContent, termId, setTermAChecked, setTermBChecked }) => {
  const checkTermHandler = () => {
    if (termId === "termA") {
      setTermAChecked((prev) => !prev);
    }
    if (termId === "termB") {
      setTermBChecked((prev) => !prev);
    }
  };

  return (
    <Container>
      <p className="Term-content">{termContent}</p>
      <InputContainer>
        <input
          type="checkbox"
          name="term"
          id={termId}
          onChange={checkTermHandler}
        ></input>
        <label htmlFor={termId} className="Term__agreement">
          위 약관에 동의합니다.
        </label>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #cdcdcd;
  padding: 20px;
  border-radius: 12px;
  width: 80%;
  height: 400px;
  margin: 30px 30px;
  @media (max-width: 768px) {
    width: 90% !important;
    height: 300pimport { TermContext } from '../../pages/Register';
x;import RegisterSuccess from '../RegisterSuccess/RegisterSuccess';

  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Term;
