import React from "react";
import { Link } from "react-router-dom";

import "./JoinedGroupItem.scss";

const JoinedGroupItem = ({ name, id }) => {
  return (
    <Link to={`/group/${id}`} className="JoinedGroupItem__link">
      <div className="JoinedGroupItem__container">{name}</div>
    </Link>
  );
};

export default JoinedGroupItem;
