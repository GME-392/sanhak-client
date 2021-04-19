import React from "react";
import "./JoinedGroupItem.scss";

const JoinedGroupItem = ({ name, id }) => {
  console.log(id);
  return <div className="JoinedGroupItem__container">{name}</div>;
};

export default JoinedGroupItem;
