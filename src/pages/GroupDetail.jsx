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

  useEffect(() => {
    fetchData();
  }, [activeUser]);

  const fetchData = async () => {
    let tempUserData;
    let tempGroupData;

    await axios.get(`${GROUP_ENDPOINT}?func=getGroup&id=${groupid}`).then((res) => {
      tempGroupData = res.data.Item;
      setGroupData(() => res.data.Item);
      axios
        .post(`${GROUP_ATTENDANCE_ENDPOINT}`, { id: res.data.Item.id })
        .then((res) => setAttendanceData(() => res.data));
      axios
        .post(`${GROUP_SOLVED_ENDPOINT}`, { id: res.data.Item.id })
        .then((res) => setAttendanceState(() => res.data.body));
    });

    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      tempUserData = res.data;
      setUserData(() => res.data);
    });

    // await axios
    //   .post(`${GROUP_RANK_ENDPOINT}`, { id: tempGroupData.id })
    //   .then((res) => setRankData(res.data.body.rank_points));

    tempUserData.active_group_set.forEach((group) => {
      if (group.group_id === tempGroupData.id && group.group_auth === true) {
        setIsMaster(true);
      }
    });
  };

  const renderGroupMenu = () => {
    switch (groupMenu) {
      case "main":
        return <GroupGoal problems={groupData?.probs} />;
      case "attendance":
        return <GroupAttendance data={groupData} attendanceState={attendanceState} />;
      case "rank":
        return <GroupRank data={groupData} />;
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
