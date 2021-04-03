import React from "react";
//Import Icons
import clock from "../img/clock.svg";
import diaphragm from "../img/diaphragm.svg";
import growth from "../img/growth.svg";
import teamwork from "../img/teamwork.svg";
import share from "../img/share.svg";
import award from "../img/award.png";
//Styles
import { About, Description, Image } from "../styles";
import styled from "styled-components";
import { scrollReveal } from "../animation";
import { useScroll } from "./useScroll";

const ServicesSection = () => {
  const [element, controls] = useScroll();
  return (
    <Services
      variants={scrollReveal}
      animate={controls}
      initial="hidden"
      ref={element}
    >
      <Description>
        <h2>
          함께, <span>최고</span>를 향해.
        </h2>
        <Cards>
          <Card>
            <div className="icon">
              <img alt="icon" src={clock} />
              <h3>도전</h3>
            </div>
            <p className="section__text">
              더 어려운 문제를
              <br />더 빨리 풀어보세요!
            </p>
          </Card>
          <Card>
            <div className="icon">
              <img alt="icon" src={growth} />
              <h3>성장</h3>
            </div>
            <p className="section__text">
              코딩 테스트, 그리고
              <br />
              개발자의 성장을 위해
            </p>
          </Card>
          <Card>
            <div className="icon">
              <img alt="icon" src={share} />
              <h3>공유</h3>
            </div>
            <p className="section__text">
              이젠 혼자가 아니에요!
              <br />
              모두와 함께하는 성장
            </p>
          </Card>
          <Card>
            <div className="icon">
              <img alt="icon" src={teamwork} />
              <h3>팀워크</h3>
            </div>
            <p className="section__text">
              하나가 되어, 최고를 향해
              <br />
              도전하세요
            </p>
          </Card>
        </Cards>
      </Description>
      <Image>
        <img alt="award" src={award} />
      </Image>
    </Services>
  );
};

const Services = styled(About)`
  h2 {
    padding-bottom: 5rem;
  }
  p {
    width: 70%;
    padding: 2rem 0rem 4rem 0rem;
  }
  .section__text {
    font-size: 1.2rem;
  }
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    justify-content: center;
  }
`;
const Card = styled.div`
  flex-basis: 20rem;
  .icon {
    display: flex;
    align-items: center;
    h3 {
      margin-left: 1rem;
      background: white;
      color: black;
      padding: 1rem;
    }
  }
`;

export default ServicesSection;
