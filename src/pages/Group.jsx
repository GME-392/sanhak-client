import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";
import { useScroll } from "../components/useScroll";
import ScrollTop from "../components/ScrollTop";
import GroupList from "../components/GroupList/GroupList";
import GroupSearch from "../components/GroupSearch/GroupSearch";
import axios from "axios";
import CreateGroupModal from "../components/CreateGroupModal/CreateGroupModal";
import GroupInfoModal from "../components/GroupInfoModal/GroupInfoModal";
import PaginationComponent from "../components/PaginationComponent/PaginationComponent";

const Group = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(null);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/groups")
      .then((res) => setGroupList(res.data));
  }, []);

  return (
    <Container
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Menu>
        <motion.h2 variants={fade}>그룹 찾기</motion.h2>
        <motion.div variants={lineAnim} className="line"></motion.div>
        <GroupSearch
          groupList={groupList}
          setGroupList={setGroupList}
          setShow={setShowCreateGroupModal}
        />
        <Hide className="Group__container">
          <motion.div className="Group__groupList">
            {groupList.map((group) => (
              <GroupList
                key={group.id}
                data={group}
                id={group.id}
                setShowGroupInfoModal={setShowGroupInfoModal}
                showGroupInfoModal={showGroupInfoModal}
                setSelected={setSelected}
                setSelectedGroupInfo={setSelectedGroupInfo}
              ></GroupList>
            ))}
          </motion.div>
          <motion.div className="Group__ad-container">
            <motion.div className="Group__ad1" />
            <motion.div className="Group__ad2" />
          </motion.div>
        </Hide>
        <PaginationComponent />
        <GroupInfoModal
          setShowGroupInfoModal={setShowGroupInfoModal}
          showGroupInfoModal={showGroupInfoModal}
          data={selectedGroupInfo}
        />
        <CreateGroupModal
          setGroupList={setGroupList}
          showCreateGroupModal={showCreateGroupModal}
          setShowCreateGroupModal={setShowCreateGroupModal}
        />
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
const Hide = styled.div`
  overflow: hidden;
`;

//Frame Animation
const Frame1 = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 10%;
  width: 100%;
  height: 100vh;
  background: #fffebf;
  z-index: 2;
`;
const Frame2 = styled(Frame1)`
  background: #ff8efb;
`;
const Frame3 = styled(Frame1)`
  background: #8ed2ff;
`;
const Frame4 = styled(Frame1)`
  background: #8effa0;
`;

export default Group;
