import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";
import axios from "axios";
import first from "../img/first.png";
import second from "../img/second.png";
import third from "../img/third.png";
import { GROUP_ENDPOINT } from "../constants/URL";

const Rank = () => {
  const [groupList, setGroupList] = useState([]);
  const [groupRankList, setGroupRankList] = useState([]);
  const [rankType, setRankType] = useState(null);

  useEffect(() => {
    const fetchGroupList = async () => {
      await axios.get(`${GROUP_ENDPOINT}?func=getAllGroup`).then((res) => {
        setGroupList(res.data);
      });
    };

    fetchGroupList();
  }, []);

  useEffect(() => {
    switch (rankType) {
      case "test":
        setGroupRankList(groupList.filter((group) => group.group_type === "test"));
        break;
      case "contest":
        setGroupRankList(groupList.filter((group) => group.group_type === "contest"));
        break;
      case "study":
        setGroupRankList(groupList.filter((group) => group.group_type === "study"));
        break;
      default:
        setGroupRankList(groupList);
    }
  }, [rankType]);

  useEffect(() => {
    const setGroupScore = () => {
      groupList.forEach((group) => {
        let groupItem = Object.values(group.rank_member);
        let scoreSum = 0;
        groupItem.forEach((item) => {
          scoreSum += item.score;
        });
        group.score = scoreSum;
      });

      setGroupList(
        groupList.sort((a, b) => {
          return b.score - a.score;
        })
      );
    };

    setGroupScore();
  }, [groupList]);

  const renderMedal = (idx) => {
    switch (idx) {
      case 0:
        return <img src={first} className="rank__medal" />;
      case 1:
        return <img src={second} className="rank__medal" />;
      case 2:
        return <img src={third} className="rank__medal" />;
      default:
        return <span className="rank__badge">{idx + 1}</span>;
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
        <motion.h2 variants={fade}>그룹 랭킹</motion.h2>
        <motion.div variants={lineAnim} className="line"></motion.div>
      </Menu>
      <motion.div className="Rank__variants">
        <div
          style={{
            display: "flex",
            marginBottom: "2rem",
            paddingBottom: "2rem",
            borderBottom: "2px solid rgba(92, 92, 92, 0.24)",
          }}
        >
          <motion.h3
            className={`rank__type rank__type--contest ${
              rankType === "contest" ? "rank__type--contest--selected" : ""
            }`}
            onClick={() => setRankType("contest")}
          >
            대회 그룹 랭킹 Top 10
          </motion.h3>
          <motion.h3
            className={`rank__type rank__type--study ${
              rankType === "study" ? "rank__type--study--selected" : ""
            }`}
            onClick={() => setRankType("study")}
          >
            학습 그룹 랭킹 Top 10
          </motion.h3>
          <motion.h3
            className={`rank__type rank__type--test ${
              rankType === "test" ? "rank__type--test--selected" : ""
            }`}
            onClick={() => setRankType("test")}
          >
            코딩 테스트 그룹 랭킹 Top 10
          </motion.h3>
        </div>
        <div className="rank__legends">
          <span className="rank__order">순위</span>
          <span>그룹명</span>
          <span>그룹 인원</span>
          <span>그룹 포인트</span>
          <span style={{ opacity: 0 }}>버튼</span>
        </div>
        <div className="rank__container">
          {groupRankList.map((group, idx) => {
            if (idx > 10) {
              return;
            }
            return (
              <div key={idx} className={`rank__item rank__item__${idx}`}>
                {renderMedal(idx)}
                <span className="rank__title">{group.name}</span>
                <span>
                  [{group.member.length} / {group.max_member}]
                </span>
                <span>{group.score}점</span>
                <button>가입 신청하기</button>
                {/* <div>{Object.values(group.rank_member)}</div> */}
              </div>
            );
          })}
        </div>
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
