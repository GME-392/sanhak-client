import React from "react";
import styled from "styled-components";
import { About } from "../styles";
import Toggle from "./Toggle";
import { AnimateSharedLayout } from "framer-motion";
import { useScroll } from "./useScroll";
import { scrollReveal } from "../animation";

const FaqSection = () => {
  const [element, controls] = useScroll();
  return (
    <Faq
      variants={scrollReveal}
      ref={element}
      animate={controls}
      initial="hidden"
    >
      <h2>
        자주 묻는 질문 <span>FAQ</span>
      </h2>
      <AnimateSharedLayout>
        <Toggle title="코맷은 유료 서비스인가요?">
          <div className="answer">
            <p>- 개인 및 교육용 그룹은 무료로 사용할 수 있습니다.</p>
            <p>
              단, 기업 및 조직 관리용으로 사용할 경우에는 그룹당 월
              19,900원/(vat 포함)의 라이센스를 구매하셔야 합니다.
            </p>
          </div>
        </Toggle>
        <Toggle title="문제 추천 알고리즘은 어떤 원리인가요?">
          <div className="answer">
            <p>- 추천 문제는 다음 기준을 순서대로 적용해 제안됩니다.</p>
            <div>1. 그룹 태그에 맞는 문제</div>
            <div>2. 해결한 사람이 더 적은 문제</div>
            <div>3. 그룹 평균 티어와 비슷한 난이도의 문제</div>
          </div>
        </Toggle>
        <Toggle title="랭킹은 언제 갱신되나요?">
          <div className="answer">
            <p>
              - 그룹 및 유저 랭킹은 매일 (GMT+9)09:00시를 기준으로 갱신됩니다.
            </p>
          </div>
        </Toggle>
        <Toggle title="새로운 기능이 있으면 좋을 것 같아요. 어디로 건의하면 될까요?">
          <div className="answer">
            <p>- 사용자 건의사항은 contact@comate.io 로 보내주시면 됩니다.</p>
            <div>제안과 피드백은 언제나 기쁘게 받고 있습니다.</div>
          </div>
        </Toggle>
      </AnimateSharedLayout>
    </Faq>
  );
};

const Faq = styled(About)`
  display: block;
  span {
    display: block;
  }
  h2 {
    padding-bottom: 2rem;
    font-weight: lighter;
  }
  .faq-line {
    background: #cccccc;
    height: 0.2rem;
    margin: 2rem 0rem;
    width: 100%;
  }
  .question {
    padding: 1rem 0rem;
    cursor: pointer;
  }
  .answer {
    div {
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }
    padding: 1rem 0rem;
    p {
      padding: 0rem 0rem;
    }
  }
`;

export default FaqSection;
