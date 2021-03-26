import React from "react";
import GroupInfoModal from "../GroupInfoModal/GroupInfoModal";
import "./GroupList.scss";

const GroupList = ({
  data,
  showGroupInfoModal,
  setShowGroupInfoModal,
  setSelectedGroupInfo,
}) => {
  const { name, leader, tier } = data;
  const onListClick = () => {
    setShowGroupInfoModal(true);
    setSelectedGroupInfo(data);
  };

  return (
    <>
      <div className="GroupList__container" onClick={onListClick}>
        <h4 className="GroupList__name">{name}</h4>
        <div className="GroupList__leader">그룹장 : {leader}</div>
        <div className="GroupList__tier">평균 티어 : {tier}</div>
      </div>
    </>
  );
};

export default GroupList;
