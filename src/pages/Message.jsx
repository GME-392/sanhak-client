import React, { useState } from "react";
import { pageAnimation, fade, lineAnim } from "../animation";
import styled from "styled-components";
import { motion } from "framer-motion";
import MessageList from "../components/MessageList/MessageList";
import MessageLog from "../components/MessageLog/MessageLog";

const Message = () => {
  const [type, setType] = useState("send");

  return (
    <Work
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Menu>
        <motion.h2 variants={fade}>📨 쪽지</motion.h2>
        <motion.div variants={lineAnim} className="line" />
        <Container>
          <LeftContainer>
            <ul className="message-type">
              <li
                onClick={() => {
                  setType("send");
                }}
                className={type === "send" ? "message-type--send" : ""}
              >
                보낸 쪽지함
              </li>
              <li
                onClick={() => {
                  setType("receive");
                }}
                className={type === "receive" ? "message-type--receive" : ""}
              >
                받은 쪽지함
              </li>
            </ul>
            <MessageList messageType={type} />
          </LeftContainer>
          <RightContainer>
            <MessageLog />
            <div className="message-send">
              <input></input>
              <SubmitButton>전송</SubmitButton>
            </div>
          </RightContainer>
        </Container>
      </Menu>
    </Work>
  );
};

const Container = styled.div`
  display: flex;
  height: 70vh;
  width: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  border: 1px solid #cdcdcd;
  flex-direction: column;
  flex: 5;
  padding: 15px;
`;

const LeftContainer = styled.div`
  border: 1px solid #cdcdcd;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
`;

const SubmitButton = styled.button`
  background-color: #40368a;
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

export default Message;
