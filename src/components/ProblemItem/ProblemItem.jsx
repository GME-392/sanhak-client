import React from "react";
import "./ProblemItem.scss";

const ProblemItem = ({ name }) => {
  return <div className="ProblemItem__container">{name}</div>;
};

export default ProblemItem;
