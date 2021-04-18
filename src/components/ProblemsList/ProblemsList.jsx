import React from "react";
import "./ProblemsList.scss";
import SolvedMemberList from "../SolvedMemberList/SolvedMemberList";

const ProblemsList = () => {
  return (
    <div className="problems-list__container">
      <div className="problems-list">
        <div>오늘의 문제 - 4월 18일</div>
        <ol className="problems-number-list">
          <li>2147번 : 마법 상자</li>
          <li>2147번 : 이친수</li>
          <li>2147번 : 컨베이어 벨트 위의 로봇</li>
          <li>2147번 : I love krii!</li>
        </ol>
      </div>

      <SolvedMemberList />
    </div>
  );
};

export default ProblemsList;
