import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";
import axios from "axios";
import { GROUP_ENDPOINT } from "../constants/URL";

const Rank = () => {
  const [groupList, setGroupList] = useState([]);
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

  console.log(groupList);

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
        <div className="rank__container">
          {groupList.map((group) => {
            return (
              <div className="rank__item">
                <div>{group.name}</div>
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
