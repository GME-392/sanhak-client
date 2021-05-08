import React, { useContext } from "react";
import { DataContext } from "../../pages/GroupDetail";
import "./ProblemSet.scss";

const ProblemSet = () => {
  const { groupData, userData } = useContext(DataContext);
  const { problems } = groupData;
  return (
    <div className="group-attendance__container">
      <div className="group-goal__text">그룹 문제집 - {problems.length}문제</div>
      <div style={{ paddingBottom: "15px" }}>
        {problems.map((prob, idx) => (
          <div className="problem__item" key={idx}>
            <a href={`https://www.acmicpc.net/${prob.numb}`}>
              {prob.numb} : {prob.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemSet;
