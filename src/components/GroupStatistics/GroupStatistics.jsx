import React, { useContext } from "react";
import { DataContext } from "../../pages/GroupDetail";

const GroupStatistics = () => {
  const { userData, groupData } = useContext(DataContext);
  return <div>그룹 통계</div>;
};

export default GroupStatistics;
