import React, { useContext } from "react";
import "./GroupGoal.scss";
import ProblemsList from "../ProblemsList/ProblemsList";
import SolvedMemberList from "../SolvedMemberList/SolvedMemberList";
import GroupNotification from "../GroupNotification/GroupNotification";

const GroupGoal = () => {
  return (
    <div className="group-goal__container">
      <div className="group-goal__text">
        {`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 - 오늘의 목표`}
      </div>
      <ProblemsList />
      <GroupNotification />
    </div>
  );
};

export default GroupGoal;
