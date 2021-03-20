import React from "react";
import home1 from "../../img/home1.png";
import { About, Description, Image, Hide } from "../../styles";
//Framer Motion
import { motion } from "framer-motion";
import { titleAnim, fade, photoAnim } from "../../animation";
import Wave from "../Wave";
import { Link } from "react-router-dom";
import "./Main.scss";

const Main = () => {
  return (
    <About>
      <Description>
        <motion.div>
          <Hide>
            <motion.h2 variants={titleAnim}>알고리즘,</motion.h2>
          </Hide>
          <Hide>
            <motion.h2 variants={titleAnim}>
              이젠 <span>함께</span> 도전해봐요.
            </motion.h2>
          </Hide>
          <Hide>
            <motion.h2 variants={titleAnim}>with Comate</motion.h2>
          </Hide>
        </motion.div>
        <motion.p variants={fade}>
          Code + Mate, 코맷은 알고리즘을 사랑하는 모두의 공간입니다.
          <br />
          삼성전자, 한국항공대학교 등 수많은 조직에서 코맷을 만나보세요.
        </motion.p>
        <Link to="/register">
          <motion.button variants={fade} className="Main__btn-register">
            회원 가입하기
          </motion.button>
        </Link>
        <Link to="/group">
          <motion.button variants={fade}>그룹 검색하기</motion.button>
        </Link>
      </Description>
      <Image>
        <motion.img
          style={{ borderRadius: "8px" }}
          variants={photoAnim}
          src={home1}
          alt="study"
        />
      </Image>
      <Wave />
    </About>
  );
};

//Styled Components

export default Main;
