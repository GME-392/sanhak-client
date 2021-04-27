import React, { useState } from "react";
import "./Tag.scss";

const Tag = ({ name, onRemove, onAddTag }) => {
  const [selected, setSelected] = useState(false);

  const setAction = () => {
    if (onRemove) onRemove(name);
    if (onAddTag) {
      setSelected(true);
      onAddTag();
    }
  };

  return (
    <div
      className={`tag ${selected ? "tag-selected" : ""}`}
      onClick={setAction}
    >
      {name}
    </div>
  );
};

export default Tag;
