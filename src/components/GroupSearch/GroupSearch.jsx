import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupSearch.scss";

const GroupSearch = ({ setGroupList }) => {
  const handleOnChange = (e) => {
    e.persist();
    axios.get("http://localhost:4000/groups").then((res) =>
      setGroupList(
        res.data.filter((el) => {
          console.log(el.leader.startsWith(e.target.value));
          return (
            el.name.startsWith(e.target.value) ||
            el.leader.startsWith(e.target.value)
          );
        })
      )
    );
  };

  return (
    <div className="GroupSearch__container">
      <input
        type="text"
        placeholder="태그, 리더명 또는 그룹명을 검색하세요"
        onChange={(e) => handleOnChange(e)}
      />
      <button>그룹 생성하기</button>
    </div>
  );
};

export default GroupSearch;
