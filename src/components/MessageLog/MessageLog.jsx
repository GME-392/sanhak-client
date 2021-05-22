import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_ENDPOINT } from "../../constants/URL";

const MessageLog = () => {
  const activeUser = useSelector((state) => state.AppState.activeUser);

  return (
    <Container>
      <SenderInput>
        <input />
        <div>님에게 새로운 메시지 작성하기</div>
      </SenderInput>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
`;

const SenderInput = styled.div`
  display: flex;
  align-items: center;
  input {
    height: 25px;
    padding: 5px;
    border-radius: 12px;
    outline: none;
    background-color: #fff;
    margin-right: 5px;
  }
`;

export default MessageLog;
