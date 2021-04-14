import React, { useEffect, useState } from "react";
import { pageAnimation, fade, lineAnim } from "../animation";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";
import { USER_ENDPOINT } from "../constants/URL";
import { useSelector } from "react-redux";

const User = (props) => {
  console.log(props);
  const { username } = props.match.params;
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const [ranking, setRanking] = useState(0);
  const [school, setSchool] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const [message, setMessage] = useState("즐겁게, 코드!");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    await axios.get(`${USER_ENDPOINT}/userid=${username}&funcname=getUser}`);
  };

  return (
    <Container>
      <motion.div
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
      >
        <Menu>
          <motion.h2 variants={fade}>{username} 유저 정보</motion.h2>
          <motion.div variants={lineAnim} className="line"></motion.div>
        </Menu>
        <motion.div variants={fade}>
          <ul className="user__item">
            <li>
              <div className="user__item__label">닉네임</div>
              <div className="user__item__content">{username}</div>
            </li>
            <li>
              <div className="user__item__label">상태 메시지</div>
              {username === activeUser ? (
                <>
                  <input
                    className="user__item__content"
                    type="text"
                    value={message}
                    placeholder={"상태 메시지를 입력하세요"}
                    maxLength={"30"}
                  />
                  <button className="user__item__change__button">변경</button>
                </>
              ) : (
                <div></div>
              )}
            </li>
            <li>
              <div className="user__item__label">랭킹</div>
              <div className="user__item__content"></div>
            </li>
            <li>
              <div className="user__item__label">해결한 문제</div>
              <div className="user__item__content"></div>
            </li>
            <li>
              <div className="user__item__label">소속 그룹 목록</div>
              <div className="user__item__content"></div>
            </li>
            <li>
              <div className="user__item__label">블로그 / 홈페이지</div>
              <div className="user__item__content"></div>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </Container>
  );
};

const Container = styled(motion.div)`
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
  padding-bottom: 1rem;

  .line {
    height: 0.5rem;
    background: #40368a;
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;
export default User;
