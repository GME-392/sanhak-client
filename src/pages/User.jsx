import React, { useEffect, useState } from "react";
import { pageAnimation, fade, lineAnim } from "../animation";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";
import {
  SOLVED_SKILLS_ENDPOINT,
  SOLVED_PROBLEMS_ENDPOINT,
  USER_ENDPOINT,
} from "../constants/URL";
import { useSelector } from "react-redux";
import { Radar } from "react-chartjs-2";
import gear from "../img/settings.png";

const User = (props) => {
  const { username } = props.match.params;
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [homepage, setHomepage] = useState("");
  const [solved, setSolved] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [organization, setOrganization] = useState("");
  const [mode, setMode] = useState(false); // 정보 수정 텍스트 토글
  const [solvedSkill, setSolvedSkill] = useState([]);

  useEffect(() => {
    getUserData();
    getSolvedSkillsList();
    getProblemsList();
  }, [mode]);

  const RadarData = {
    labels: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],

    datasets: [
      {
        label: "해결한 문제 수",
        backgroundColor: "rgba(109, 151, 214, .2)",
        borderColor: "rgba(109, 151, 214, 1)",
        pointBackgroundColor: "rgba(109, 151, 214, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "rgba(109, 151, 214, 1)",
        data: Object.values(solvedSkill),
      },
    ],
  };
  const RadarOptions = {
    scale: {
      ticks: {
        min: 0,
        max: solved.length,
        stepSize: 50,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
      angleLines: {
        color: "rgba(125, 125, 125, .3)",
        lineWidth: 1,
      },
      gridLines: {
        color: "rgba(125, 125, 125, .3)",
        circular: false,
      },
    },
  };

  const getUserData = async () => {
    await axios
      .get(`${USER_ENDPOINT}userid=${username}&funcname=getUser`)
      .then((res) => {
        setUserData(res.data);
      });
  };

  const getProblemsList = async () => {
    await axios
      .post(`${SOLVED_PROBLEMS_ENDPOINT}`, { id: username })
      .then((res) => {
        setSolved(res.data.body);
        setIsloading(false);
      });
  };

  const getSolvedSkillsList = async () => {
    await axios
      .post(`${SOLVED_SKILLS_ENDPOINT}`, { id: username })
      .then((res) => {
        setSolvedSkill(res.data.body);
        setIsloading(false);
      });
  };

  const updateMessage = async () => {
    await axios
      .patch(`${USER_ENDPOINT}`, {
        funcname: "updateMessage",
        userid: username,
        message: message,
      })
      .then((res) => {
        console.log(res);
      });
  };
  console.log(userData);
  console.log(userData?.active_group_set);

  const updateOrganization = async () => {
    await axios
      .patch(`${USER_ENDPOINT}`, {
        funcname: "updateOrganization",
        userid: username,
        organization: organization,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const updateHomepage = async () => {
    await axios
      .patch(`${USER_ENDPOINT}`, {
        funcname: "updateHomepage",
        userid: username,
        homepage: homepage,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Container>
      <motion.div
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
      >
        <Menu>
          <motion.h2 variants={fade}>{username} 유저 정보</motion.h2>
          <motion.div variants={lineAnim} className="line"></motion.div>
        </Menu>
        <motion.div variants={fade} className="user__container">
          {userData ? (
            <div className="user__container__horizontal">
              <ul className="user__item">
                <li>
                  <div className="user__item__label">
                    백준 온라인 저지 아이디
                  </div>
                  <div className="user__item__content">
                    <a
                      href={userData?.boj_name}
                      target="_blank"
                      style={{ fontSize: "1.4rem", color: "#0c1e52" }}
                    >
                      {userData?.boj_name}
                    </a>
                  </div>
                </li>
                <li>
                  <div className="user__item__label">소속 그룹 목록</div>
                  <div className="user__item__content">
                    {/* {userData?.active_group_set.map()} */}
                  </div>
                </li>
                {username === activeUser && (
                  <h6
                    className="user__item__modify"
                    onClick={() => setMode((prev) => !prev)}
                  >
                    <img src={gear} /> 정보 수정
                  </h6>
                )}
                <li>
                  <div className="user__item__label">상태 메시지</div>
                  {mode === true ? (
                    <>
                      <input
                        className="user__item__content"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={"상태 메시지를 입력하세요"}
                        maxLength={"30"}
                      />
                      <button
                        className="user__item__change__button"
                        onClick={updateMessage}
                      >
                        변경
                      </button>
                    </>
                  ) : (
                    <div className="user__item__content">
                      {userData?.user_message}
                    </div>
                  )}
                </li>

                <li>
                  <div className="user__item__label">학교 / 회사</div>
                  {mode === true ? (
                    <>
                      <input
                        className="user__item__content"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={"소속을 입력하세요"}
                        maxLength={"30"}
                      />
                      <button
                        className="user__item__change__button"
                        onClick={updateOrganization}
                      >
                        변경
                      </button>
                    </>
                  ) : (
                    <div className="user__item__content">
                      {userData?.organization}
                    </div>
                  )}
                </li>
                <li>
                  <div className="user__item__label">블로그 / 홈페이지</div>
                  <div className="user__item__content">
                    {mode === true ? (
                      <>
                        <input
                          className="user__item__content"
                          type="text"
                          value={homepage}
                          onChange={(e) => setHomepage(e.target.value)}
                          placeholder={"블로그 / 홈페이지 주소를 입력하세요"}
                          maxLength={"40"}
                        />
                        <button
                          className="user__item__change__button"
                          onClick={updateHomepage}
                        >
                          변경
                        </button>
                      </>
                    ) : (
                      <a
                        href={homepage}
                        className="user__item__content"
                        style={{ fontSize: "1.4rem", color: "#0c1e52" }}
                      >
                        {userData?.homepage}
                      </a>
                    )}
                  </div>
                </li>
              </ul>
              {isLoading ? (
                <div
                  className="user__solved__list"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.7rem",
                  }}
                >
                  📪 데이터를 불러오는 중입니다...
                </div>
              ) : (
                <div className="user__solved__list">
                  <li>
                    <div className="user__item__label">
                      해결한 문제 - {solved.length}문제
                    </div>
                    <hr className="user__solved__divideline" />
                    <Radar data={RadarData} options={RadarOptions} />
                  </li>
                </div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: "1.4rem" }}>
              🚧 이런! 찾는 유저가 존재하지 않네요!
            </div>
          )}
        </motion.div>
      </motion.div>
    </Container>
  );
};

const Container = styled(motion.div)`
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
  padding-bottom: 1rem;

  .line {
    height: 0.5rem;
    background: #40368a;
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;
export default User;
