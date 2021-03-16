import React from "react";
import "./GroupSearch.scss";

const GroupSearch = () => {
  return (
    <div>
      <input type="text" placeholder="그룹명을 검색하세요" />
      <div>찾는 그룹이 없으신가요?</div>
      <button>그룹 생성하기</button>
    </div>
  );
};

export default GroupSearch;
