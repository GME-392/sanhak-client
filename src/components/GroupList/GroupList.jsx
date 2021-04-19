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
  const { name, leader, tier, tags, group_info, max_member, member } = data;
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
        <div>
          <h4 className="GroupList__name">
            {name} <span className="GroupList__leader">- by {leader}</span>
          </h4>

          <div className="GroupList__info">{group_info}</div>
        </div>
        <div className="GroupList__max-member">{`정원 : [${member?.length}/${max_member}]`}</div>
      </Container>
    </>
  );
};

const Container = styled.div``;

export default GroupList;
