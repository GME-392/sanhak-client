import React from "react";
import "./Tag.scss";

const Tag = ({ name, onRemove }) => {
  const removeTagOnClick = () => {
    if (onRemove) onRemove(name);
  };

  return (
    <div className="tag" onClick={removeTagOnClick}>
      {name}
    </div>
  );
};

export default Tag;
