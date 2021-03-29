import React from "react";
import styled from "styled-components";
import "./Term.scss";

const Term = ({ termContent, termId }) => {
  return (
    <Container>
      <p className="Term-content">{termContent}</p>
      <InputContainer>
        <input type="checkbox" name="term" id={termId}></input>
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
    height: 300px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Term;
