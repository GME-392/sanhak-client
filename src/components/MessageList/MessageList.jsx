import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { USER_ENDPOINT } from "../../constants/URL";

const MessageList = () => {
  const [sentMessageList, setSentMessageList] = useState([]);
  const [receivedMessageList, setReceivedMessageList] = useState([]);
  const [seelctedUser, setSelectedUser] = useState("");
  const activeUser = useSelector((state) => state.AppState.activeUser);

  useEffect(() => {
    fetchMessageList();
  }, [activeUser]);

  const fetchMessageList = async () => {
    await axios
      .get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getDirectMessages`)
      .then((res) => {
        setSentMessageList(res.data.sended_messages);
        setReceivedMessageList(res.data.received_messages);
      });
  };

  return (
    <Container>
      {sentMessageList.map((message) => (
        <MessageItem>
          <MessageItemTop>
            <span>{message.from}</span>
            <span>{message.created_at}</span>
          </MessageItemTop>
          <span>{message.content}</span>
        </MessageItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
`;

const MessageItem = styled.div`
  border-bottom: 1px solid #cdcdcd;
  padding: 10px;
  cursor: pointer;

  &:nth-child(1) {
    padding-top: 0;
  }

  span {
    font-weight: normal;
    color: #333;
  }
`;

const MessageItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-weight: bold;
  }
`;

export default MessageList;
