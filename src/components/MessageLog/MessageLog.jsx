import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_ENDPOINT } from "../../constants/URL";

const MessageLog = ({ setSendTo, messageType, selctedMessage }) => {
  const activeUser = useSelector((state) => state.AppState.activeUser);

  return (
    <Container>
      <SenderInput>
        <input onChange={(e) => setSendTo(e.target.value)} />
        <div>님에게 새로운 메시지 작성하기</div>
      </SenderInput>
      {selctedMessage && (
        <MessageContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{messageType === "send" ? "보낸 쪽지" : "받은 쪽지"}</h3>
            <h6>{new Date(selctedMessage.created_at).toLocaleString()}</h6>
          </div>
          <div>{selctedMessage?.content}</div>
        </MessageContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SenderInput = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  height: 50px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid #40368a;
  input {
    height: 25px;
    padding: 10px;
    border-radius: 2 px;
    border-top: none;
    border-right: none;
    border-left: none;
    outline: none;
    background-color: #fff;
    margin-right: 8px;
  }
  div {
    font-size: 1.2rem;
  }
`;

const MessageContainer = styled.div`
  border: 1px solid #cdcdcd;
  margin: 20px 0;
  padding: 20px;
  flex: 5;
`;

export default MessageLog;
