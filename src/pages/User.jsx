import React, { useEffect, useState } from "react";
import { pageAnimation, fade, lineAnim } from "../animation";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";
import { SOLVED_PROBLEMS_ENDPOINT, USER_ENDPOINT } from "../constants/URL";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";

const User = (props) => {
  const { username } = props.match.params;
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [homepage, setHomepage] = useState("https://merrily-code.tistory.com/");
  const [solved, setSolved] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    getUserData();
    getProblemsList();
  }, []);

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

  const updateMessage = async () => {
    await axios
      .patch(`${USER_ENDPOINT}`, {
        funcname: "updateMessage",
        userid: username,
        message: "바꿀 메시지",
      })
      .then((res) => {
        console.log(res);
      });
  };

  console.log(isLoading);

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
          <div className="user__container__horizontal">
            <ul className="user__item">
              <li>
                <div className="user__item__label">백준 온라인 저지 아이디</div>
                <div className="user__item__content">{userData?.boj_name}</div>
              </li>
              <li>
                <div className="user__item__label">랭킹</div>
                <div className="user__item__content"></div>
              </li>
              <li>
                <div className="user__item__label">소속 그룹 목록</div>
                <div className="user__item__content"></div>
              </li>
              <li>
                <div className="user__item__label">상태 메시지</div>
                {username === activeUser ? (
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
                {username === activeUser ? (
                  <>
                    <input
                      className="user__item__content"
                      type="text"
                      value={organization}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={"상태 메시지를 입력하세요"}
                      maxLength={"30"}
                    />
                    <button className="user__item__change__button">변경</button>
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
                  {username === activeUser ? (
                    <>
                      <input
                        className="user__item__content"
                        type="text"
                        value={homepage}
                        onChange={(e) => setHomepage(e.target.value)}
                        placeholder={"블로그 / 홈페이지 주소를 입력하세요"}
                        maxLength={"40"}
                      />
                      <button className="user__item__change__button">
                        변경
                      </button>
                    </>
                  ) : (
                    <a href={homepage} className="user__item__content">
                      {homepage}
                    </a>
                  )}
                </div>
              </li>
            </ul>
            <div className="user__solved__list">
              <li>
                <div className="user__item__label">해결한 문제</div>
                <hr className="user__solved__divideline" />
                {isLoading ? (
                  <div className="user__solved__loading">
                    📪 데이터를 불러오는 중입니다...
                  </div>
                ) : (
                  <div className="user__solved__problem__list">
                    {solved.map((problem, idx) => (
                      <a
                        key={idx}
                        className="user__solved__problem"
                        target="_blank"
                        href={`https://www.acmicpc.net/problem/${problem}`}
                      >
                        {problem}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            </div>
          </div>
          {/* <Doughnut data={...} /> */}
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
