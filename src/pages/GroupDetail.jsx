import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";

import GroupMenu from "../components/GroupMenu/GroupMenu";
import GroupUserList from "../components/GroupUserList/GroupUserList";
import GroupGoal from "../components/GroupGoal/GroupGoal";
import axios from "axios";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../constants/URL";
import { useSelector } from "react-redux";

export const DataContext = createContext();

const GroupDetail = ({ match }) => {
  const { groupid } = match.params;
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const [groupData, setGroupData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getGroupInfo();
    getUserInfo();
  }, [activeUser]);

  const getGroupInfo = async () => {
    await axios
      .get(`${GROUP_ENDPOINT}?func=getGroup&id=${groupid}`)
      .then((res) => setGroupData(() => res.data.Item));
  };

  const getUserInfo = async () => {
    await axios
      .get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`)
      .then((res) => setUserData(() => res.data));
  };

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
            {groupData?.name}
          </motion.h2>
          <motion.div className="group-detail-group-rank">
            {groupData?.group_info}
          </motion.div>
        </div>
        <motion.div
          variants={lineAnim}
          className="line group-detail-line"
        ></motion.div>
        <DataContext.Provider
          value={{ groupData: groupData, userData: userData }}
        >
          <GroupMenu groupId={groupData?.id} />
          <GroupGoal problems={groupData?.probs} />
        </DataContext.Provider>
        {/* <GroupUserList /> */}
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
