import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//Animations
import { motion } from "framer-motion";
import {
  sliderContainer,
  slider,
  pageAnimation,
  fade,
  photoAnim,
  lineAnim,
} from "../animation";
import { useScroll } from "../components/useScroll";
import ScrollTop from "../components/ScrollTop";
import GroupSearch from "../components/GroupSearch/GroupSearch";
import moment from "moment";
import "moment/locale/ko";

const Rank = () => {
  var currentDate = moment();
  moment.locale("ko");

  var weekStart = currentDate.clone().startOf("isoweek");

  var days = [];

  return (
    <Container
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Menu>
        <motion.h2 variants={fade}>랭킹</motion.h2>
        <motion.div variants={lineAnim} className="line"></motion.div>
      </Menu>
      <motion.div className="Rank__variants">
        <motion.h3>명예의 전당</motion.h3>
        <motion.h3>그룹 랭킹</motion.h3>
        <motion.h3>유저 랭킹</motion.h3>
      </motion.div>
    </Container>
  );
};

const Container = styled(motion.div)`
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

const Hide = styled.div`
  overflow: hidden;
`;

export default Rank;
