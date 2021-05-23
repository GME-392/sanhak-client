import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { USER_ENDPOINT } from "../../constants/URL";
import "./MessageList.scss";

const MessageList = ({ messageType, setSelectedMessage }) => {
  const [sentMessageList, setSentMessageList] = useState([]);
  const [receivedMessageList, setReceivedMessageList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messageList, setMessageList] = useState(sentMessageList);
  const activeUser = useSelector((state) => state.AppState.activeUser);

  useEffect(() => {
    fetchMessageList();
  }, [activeUser]);

  useEffect(() => {
    if (messageType === "send") {
      setMessageList(sentMessageList);
    } else {
      setMessageList(receivedMessageList);
    }
  }, [messageType]);

  const fetchMessageList = async () => {
    await axios
      .get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getDirectMessages`)
      .then((res) => {
        setSentMessageList(res.data.sended_messages);
        setReceivedMessageList(res.data.received_messages);
        // 초기값
        setMessageList(res.data.sended_messages);
      });
  };

  return (
    <Container>
      {messageList.map((message, idx) => (
        <MessageItem
          onClick={() => {
            setSelectedMessage(message);
            setSelected(idx);
          }}
          key={message.id}
          className={idx === selected ? "message-item-selected" : null}
        >
          <MessageItemTop>
            <span>{messageType === "send" ? message.to : message.from}</span>
            <span>{new Date(message.created_at).toLocaleString()}</span>
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
  height: 1000vh;
  overflow-y: scroll;
`;

const MessageItem = styled.div`
  border-bottom: 1px solid #cdcdcd;
  padding: 10px;
  cursor: pointer;

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
