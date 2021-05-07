import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";
import GroupList from "../components/GroupList/GroupList";
import GroupSearch from "../components/GroupSearch/GroupSearch";
import axios from "axios";
import CreateGroupModal from "../components/CreateGroupModal/CreateGroupModal";
import GroupInfoModal from "../components/GroupInfoModal/GroupInfoModal";
import ReactPaginate from "react-paginate";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../constants/URL";
import { useSelector } from "react-redux";
import { AppState } from "../redux/reducers/AppState";
import fairy from "../img/fairy.png";

export const DataContext = createContext();

const Group = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [offset, setOffset] = useState(0);
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const [loadGroup, setLoadingGroup] = useState(true);
  const [loadUser, setLoadingUser] = useState(true);

  useEffect(() => {
    getGroupData();
  }, [offset]);

  useEffect(() => {
    getUserData();
  }, [activeUser]);

  const getGroupData = async () => {
    await axios.get(`${GROUP_ENDPOINT}?func=getAllGroup`).then((res) => {
      setGroupList(res.data.slice(offset, offset + 6));
    });
    setLoadingGroup(false);
  };

  const getUserData = async () => {
    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      console.log(res.data);
      setUserData(() => res.data);
    });
    setLoadingUser(false);
  };

  const handlePageClick = (data) => {
    setOffset(data.selected * 6);
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
        <motion.h2 variants={fade}>그룹 찾기</motion.h2>
        <motion.div variants={lineAnim} className="line"></motion.div>
        <GroupSearch
          groupList={groupList}
          setGroupList={setGroupList}
          setShow={setShowCreateGroupModal}
        />
        <div className="divideLine" />
        {loadGroup === true && loadUser === true ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={fairy} className="rank__fairy" />
            <h3>알고리즘의 요정이 정보를 불러오고 있습니다!</h3>
          </div>
        ) : (
          <div className="Group__container">
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
          </div>
        )}

        {/* <PaginationComponent /> */}
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
        <DataContext.Provider value={{ userData: userData }}>
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
        </DataContext.Provider>
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
export default Group;
