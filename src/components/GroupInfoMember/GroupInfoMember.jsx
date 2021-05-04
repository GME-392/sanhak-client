import React from "react";
import { Link } from "react-router-dom";
import crown from "../../img/crown.png";
import "./GroupInfoMember.scss";

const GroupInfoMember = ({ master, name }) => {
  console.log(name);
  return (
    <Link to={`/user/${name}`} className="GroupInfoMember__link">
      <div className="GroupInfoMember__container">
        {master && (
          <img src={crown} width={20} align="left" style={{ position: "relative", left: "10px" }} />
        )}
        {name}
      </div>
    </Link>
  );
};

export default GroupInfoMember;
