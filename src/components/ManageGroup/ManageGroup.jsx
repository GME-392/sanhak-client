import React from "react";

const ManageGroup = () => {
  return (
    <div className="group-attendance__container" style={{ display: "block", padding: "2rem" }}>
      <div className="group-goal__text" style={{ top: "-4rem" }}>
        그룹 관리
      </div>
      <div>그룹 타입 변경</div>
      <div>
        <input type="radio" id="contest" name="type"></input>
        <label htmlFor="contest" name="type">
          대회
        </label>
        <input type="radio" id="study" name="type"></input>
        <label htmlFor="contest" name="type">
          스터디
        </label>
        <input type="radio" id="job" name="type"></input>
        <label htmlFor="contest" name="type">
          코딩 테스트
        </label>
      </div>
      <div>문제집 관리</div>
      <div>
        <input type="radio" id="contest" name="type"></input>
        <label htmlFor="contest" name="type">
          대회
        </label>
        <input type="radio" id="study" name="type"></input>
        <label htmlFor="contest" name="type">
          스터디
        </label>
        <input type="radio" id="job" name="type"></input>
        <label htmlFor="contest" name="type">
          코딩 테스트
        </label>
      </div>
      <div>출석 주기 (일)</div>
      <div>
        <input type="number" min={1} max={10} placeholder="1"></input>
      </div>
      <button>그룹 해체</button>
    </div>
  );
};

export default ManageGroup;
