import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupSearch.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const GroupSearch = ({ setGroupList, setShow }) => {
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const history = useHistory();

  const handleShow = () => {
    if (activeUser === null) {
      // 로그인 안돼있으면 홈으로 보내버림
      history.push("/");
    } else {
      setShow(true);
    }
  };

  const handleOnChange = (e) => {
    e.persist();
    axios.get("http://localhost:4000/groups").then((res) =>
      setGroupList(
        res.data.filter((el) => {
          return (
            el.name.includes(e.target.value) ||
            el.leader.includes(e.target.value)
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
        className="GroupSearch__input"
      />
      <button onClick={handleShow} className="GroupSearch__button">
        그룹 생성하기
      </button>
    </div>
  );
};

export default GroupSearch;
