import React from "react";
import GroupInfoModal from "../GroupInfoModal/GroupInfoModal";
import "./GroupList.scss";
import Tag from "../Tag/Tag";
import styled from "styled-components";
import classNames from "classnames";

const GroupList = ({
  data,
  showGroupInfoModal,
  setShowGroupInfoModal,
  setSelectedGroupInfo,
}) => {
  const { name, leader, tier, tags, group_info, max_member, members } = data;
  const onListClick = () => {
    setShowGroupInfoModal(true);
    setSelectedGroupInfo(data);
  };

  return (
    <>
      <Container
        className={`GroupList__container Diamond`}
        onClick={onListClick}
      >
        <h4 className="GroupList__name">
          {name} <span className="GroupList__leader">- by {leader}</span>
        </h4>

        <div className="GroupList__info">{group_info}</div>
        <div>{`정원 : [${members?.length}/${max_member}]`}</div>
      </Container>
    </>
  );
};

const Container = styled.div``;

export default GroupList;
