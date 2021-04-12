import React, { useEffect, useState } from "react";
import { pageAnimation, fade, lineAnim } from "../animation";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";
import { USER_ENDPOINT } from "../constants/URL";

const User = (props) => {
  const { username } = props.match.params;
  const [ranking, setRanking] = useState(0);
  const [school, setSchool] = useState(0);
  const [groupList, setGroupList] = useState([]);

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
          <motion.h2 variants={fade}>유저 정보</motion.h2>
          <motion.div variants={lineAnim} className="line"></motion.div>
        </Menu>
        <div className="user__item">닉네임</div>
        <div>{username}</div>
        <div className="user__item">랭킹</div>
        <div className="user__item">학교 / 회사</div>
        <div className="user__item">소속 그룹 목록</div>
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
const Hide = styled.div`
  overflow: hidden;
`;

export default User;
