import React, { useState } from "react";
import { motion } from "framer-motion";
import { lineAnim, pageAnimation } from "../animation";
import styled from "styled-components";
import study from "../img/study.png";
import prize from "../img/prize.png";
import company from "../img/company.png";
import GuideMenu from "../components/GuideMenu/GuideMenu";

const Guide = () => {
  const [type, setType] = useState(null);

  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      <Container className="Guide__container">
        <h2>학습 유형을 선택하세요</h2>
        <Menu>
          <motion.div variants={lineAnim} className="line"></motion.div>
          <div className="Guide__item__container">
            <div
              className="Guide__item Guide__contest__btn"
              onClick={() => setType(() => "contest")}
              style={
                type !== null
                  ? type === "contest"
                    ? { animation: "1s moveRight1 forwards" }
                    : { animation: "1s fadeout forwards" }
                  : {}
              }
            >
              <div className="Guide__title__container">
                <img src={prize} className="Guide__item__icon"></img>
                <div className="Guide__item__title">대회</div>
              </div>
              <div className="Guide__item__description">
                국내 & 해외 알고리즘 대회에 도전하기 위한 과정입니다.
              </div>
            </div>
            <div
              className="Guide__item Guide__basics__btn"
              onClick={() => setType(() => "study")}
              style={
                type !== null
                  ? type === "study"
                    ? { animation: "1s moveRight2 forwards" }
                    : { animation: "1s fadeout forwards" }
                  : {}
              }
            >
              <div className="Guide__title__container">
                <img src={study} className="Guide__item__icon"></img>
                <div className="Guide__item__title">기초 학습</div>
              </div>
              <div className="Guide__item__description">
                파이썬, C++ 등 기초 프로그래밍 언어의 문법을 숙달하기 위한
                과정입니다.
              </div>
            </div>
            <div
              className="Guide__item Guide__job__btn"
              onClick={() => setType(() => "job")}
              style={
                type !== null
                  ? type === "job"
                    ? { animation: "1s moveRight3 forwards" }
                    : { animation: "1s fadeout forwards" }
                  : {}
              }
            >
              <div className="Guide__title__container">
                <img src={company} className="Guide__item__icon"></img>
                <div className="Guide__item__title">코딩 테스트</div>
              </div>
              <div className="Guide__item__description">
                IT기업, 소프트웨어 분야의 취업 준비를 위한 과정입니다.
              </div>
            </div>
          </div>
          {type && <GuideMenu type={type} />}
        </Menu>
      </Container>
    </motion.div>
  );
};

const Container = styled(motion.div)`
  height: 100vh;
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
  height: 100%;

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

export default Guide;
