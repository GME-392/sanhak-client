import React, { useContext } from "react";
import { DataContext } from "../../pages/GroupDetail";
import "./ProblemSet.scss";

const ProblemSet = () => {
  const { groupData, userData } = useContext(DataContext);
  const { problems } = groupData;
  return (
    <div className="group-attendance__container">
      <div className="group-goal__text">그룹 문제집 - {problems.length}문제</div>
      <div className="problem__set__container" style={{ paddingBottom: "15px" }}>
        {problems.map((prob, idx) => {
          return userData?.solved_problems?.includes(String(prob.numb)) ? (
            <a
              className="problem__item"
              key={idx}
              style={{
                borderColor: "#33a158",
                boxShadow: "2px 1px 3px 3px rgba(137,199,133,0.61)",
              }}
              href={`https://www.acmicpc.net/problem/${prob.numb}`}
            >
              <div>
                {prob.numb}번 : {prob.name}
              </div>
            </a>
          ) : (
            <a
              className="problem__item"
              key={idx}
              style={{ borderColor: "#be3131" }}
              href={`https://www.acmicpc.net/problem/${prob.numb}`}
            >
              <div>
                {prob.numb}번 : {prob.name}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemSet;
