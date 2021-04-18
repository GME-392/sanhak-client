import React from "react";
import "./GroupGoal.scss";
import ProblemsList from "../ProblemsList/ProblemsList";
import SolvedMemberList from "../SolvedMemberList/SolvedMemberList";

const GroupGoal = () => {
  return (
    <div className="group-goal__container">
      <div className="group-goal__text">오늘의 목표</div>
      <ProblemsList />
    </div>
  );
};

export default GroupGoal;
