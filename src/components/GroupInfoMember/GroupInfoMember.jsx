import React from "react";
import { Link } from "react-router-dom";
import "./GroupInfoMember.scss";

const GroupInfoMember = ({ name }) => {
  return (
    <Link to={`/user/${name}`} className="GroupInfoMember__link">
      <div className="GroupInfoMember__container">{name}</div>
    </Link>
  );
};

export default GroupInfoMember;
