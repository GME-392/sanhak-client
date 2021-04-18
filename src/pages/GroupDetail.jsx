import React, { useEffect, useState } from "react";
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";

import GroupMenu from "../components/GroupMenu/GroupMenu";
import GroupUserList from "../components/GroupUserList/GroupUserList";
import GroupGoal from "../components/GroupGoal/GroupGoal";

const GroupDetail = ({ name }) => {
  return (
    <Container
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Menu>
        <div>
          <motion.h2 variants={fade} className="group-detail-group-name">
            {name}
          </motion.h2>
          <motion.div className="group-detail-group-rank">
            {"Silver IV"}
          </motion.div>
        </div>
        <motion.div
          variants={lineAnim}
          className="line group-detail-line"
        ></motion.div>
        <GroupMenu name={name} />
        <GroupGoal />
        <GroupUserList />
      </Menu>
    </Container>
  );
};

const Container = styled(motion.div)`
  min-height: 100vh;
  overflow: hidden;
  padding: 5rem 10rem;
  @media (max-width: 900px) {
    padding: 1rem 1rem;
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
    margin-bottom: 3rem;
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;

export default GroupDetail;
