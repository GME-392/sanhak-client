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
  const { name, leader, tier, tags, max_member, members } = data;
  console.log(data);
  const onListClick = () => {
    setShowGroupInfoModal(true);
    setSelectedGroupInfo(data);
  };

  return (
    <>
      <Container
        className={`GroupList__container ${tier}`}
        onClick={onListClick}
      >
        <h4 className="GroupList__name">{name}</h4>
        <div className="GroupList__leader">그룹 리더 : {leader}</div>
        <div>{`정원 : [${members.length}/${max_member}]`}</div>
        <span>
          태그 :{" "}
          {tags?.map((tag, idx) => (
            <Tag key={idx} name={tag} />
          ))}
        </span>
      </Container>
    </>
  );
};

const Container = styled.div``;

export default GroupList;
