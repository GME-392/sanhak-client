import React from "react";
import "./GroupList.scss";

const GroupList = ({ data }) => {
  const { name, leader, tier } = data;
  return (
    <div className="GroupList__container">
      <h4 className="GroupList__name">{name}</h4>
      <div className="GroupList__leader">그룹장 : {leader}</div>
      <div className="GroupList__tier">평균 티어 : {tier}</div>
    </div>
  );
};

export default GroupList;
