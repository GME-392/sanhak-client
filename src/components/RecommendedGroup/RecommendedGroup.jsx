import React from "react";
import "./RecommendedGroup.scss";

const RecommendedGroup = ({ data, onClick }) => {
  const { id, name, tag, max_member, member } = data;
  console.log(member);
  return (
    <div className="Recommended__container" onClick={onClick}>
      {name} {`[${member.length}/${max_member}]`}
      <div style={{ marginTop: "1rem" }}>
        {tag.map((tagname, idx) => (
          <span style={{ display: "inline-block", marginRight: "0.3rem" }}>
            {idx > 0 ? " / " : " "}
            {tagname}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecommendedGroup;
