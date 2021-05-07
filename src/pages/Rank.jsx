import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";

import moment from "moment";
import "moment/locale/ko";

const Rank = () => {
  moment.locale("ko");

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
        <motion.h3>그룹 활동점수 랭킹</motion.h3>
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
