import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";

import GroupMenu from "../components/GroupMenu/GroupMenu";
import GroupUserList from "../components/GroupUserList/GroupUserList";
import GroupGoal from "../components/GroupGoal/GroupGoal";
import axios from "axios";
import {
  GROUP_ENDPOINT,
  USER_ENDPOINT,
  GROUP_ATTENDANCE_ENDPOINT,
  GROUP_SOLVED_ENDPOINT,
  GROUP_RANK_ENDPOINT,
} from "../constants/URL";
import { useSelector } from "react-redux";
import GroupAttendance from "../components/GroupAttendance/GroupAttendance";
import GroupRank from "../components/GroupRank/GroupRank";
import ProblemSet from "../components/ProblemSet/ProblemSet";
import fairy from "../img/fairy.png";

export const DataContext = createContext();

const GroupDetail = ({ match }) => {
  const { groupid } = match.params;
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const [groupData, setGroupData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [groupMenu, setGroupMenu] = useState("main");
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendanceState, setAttendanceState] = useState(null);
  const [isMaster, setIsMaster] = useState(false);
  const [rankData, setRankData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeUser]);

  const fetchData = async () => {
    let tempUserData;
    let tempGroupData;

    await axios.get(`${GROUP_ENDPOINT}?func=getGroup&id=${groupid}`).then(async (res) => {
      tempGroupData = res.data.Item;
      setGroupData(() => res.data.Item);
      await axios
        .post(`${GROUP_ATTENDANCE_ENDPOINT}`, { id: res.data.Item.id })
        .then((res) => setAttendanceData(() => res.data));
      await axios
        .post(`${GROUP_SOLVED_ENDPOINT}`, { id: res.data.Item.id })
        .then((res) => setAttendanceState(() => res.data.body));
    });

    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      tempUserData = res.data;
      setUserData(() => res.data);
    });

    if (tempGroupData.leader === activeUser) {
      // if (group.group_id === tempGroupData.id && group.group_auth === true) {
      setIsMaster(true);
    }
    setIsLoading(false);
  };

  const renderGroupMenu = () => {
    switch (groupMenu) {
      case "main":
        return <GroupGoal groupData={groupData} />;
      case "attendance":
        return <GroupAttendance data={groupData} attendanceState={attendanceState} />;
      case "problems":
        return <ProblemSet />;
      case "rank":
        return <GroupRank data={groupData} />;
      case "noti-job":
        return <div>채용 정보</div>;
      case "noti-contest":
        return <div>대회 정보</div>;
      default:
        break;
    }
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
          <motion.div className="group-detail-group-rank">{groupData?.group_info}</motion.div>
        </div>
        <motion.div variants={lineAnim} className="line group-detail-line"></motion.div>
        {isLoading ? (
          <div className="group--loading">
            <img src={fairy}></img>
            <div>그룹 정보를 불러오는 중입니다...</div>
          </div>
        ) : (
          <DataContext.Provider
            value={{
              groupData: groupData,
              userData: userData,
              isMaster: isMaster,
              rankData: rankData,
            }}
          >
            <GroupMenu groupId={groupData?.id} setGroupMenu={setGroupMenu} />
            {renderGroupMenu()}
          </DataContext.Provider>
        )}

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
