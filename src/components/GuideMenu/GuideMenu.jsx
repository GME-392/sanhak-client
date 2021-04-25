import React from "react";
import "./GuideMenu.scss";

const GuideMenu = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case "contest":
        return (
          <>
            <ul>
              <li>권장 : 코맷 레이팅 1000점, 또는 Solved.ac Silver I 이상</li>
              <li>트리, 그래프 등의 고급 자료구조에 대한 이해가 있으신 분</li>
              <li>알고리즘 대회에 처음 도전해보시는 분</li>
            </ul>
            <h3
              className={`GuideMenu__title title--${type}`}
              style={{ marginTop: "2rem" }}
            >
              관련 태그
            </h3>
          </>
        );
      case "study":
        return (
          <>
            <ul>
              <li>코딩에 흥미를 느끼는 누구나!</li>
              <li>프로그래밍 언어에 처음 입문하는 분</li>
              <li>다양한 문제를 풀면서 프로그래밍 문법을 익히고자 하는 분</li>
            </ul>
            <h3
              className={`GuideMenu__title title--${type}`}
              style={{ marginTop: "2rem" }}
            >
              관련 태그
            </h3>
          </>
        );
      case "job":
        return (
          <>
            <ul>
              <li>권장 : 코맷 레이팅 800점, 또는 Solved.ac Silver IV 이상</li>
              <li>스택, 큐 등의 자료구조에 대한 기본적인 이해가 있는 분</li>
              <li>IT계열 대기업 및 소프트웨어 직렬 취업을 준비하는 분</li>
            </ul>
            <h3
              className={`GuideMenu__title title--${type}`}
              style={{ marginTop: "2rem" }}
            >
              관련 태그
            </h3>
          </>
        );

      default:
        return;
    }
  };
  return (
    <div className="GuideMenu__container">
      <h3 className={`GuideMenu__title title--${type}`}>
        이런 분들께 추천드려요
      </h3>
      {renderContent()}
    </div>
  );
};

export default GuideMenu;
