import React from "react";
import "./SolvedMemberList.scss";

const SolvedMemberList = () => {
  return (
    <div className="solved-member-list__container">
      <div className="solved-member-container">
        <div>해결한 멤버 목록</div>
        <ul className="solved-member-list">
          <li>
            <span style={{ color: "green" }}>suhwanc</span> chanstar
          </li>
          <li>suhwanc chanstar</li>
          <li>suhwanc chanstar</li>
          <li>suhwanc chanstar</li>
        </ul>
      </div>
    </div>
  );
};

export default SolvedMemberList;
