import React, { useEffect, useState } from "react";
import "./JobNotice.scss";
import axios from "axios";
import { JOB_NOTICE_ENDPOINT } from "../../constants/URL";

const JobNotice = () => {
  const [jobInfoList, setJobInfoList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${JOB_NOTICE_ENDPOINT}?func=getAllNotice`).then((res) => {
      setJobInfoList(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="group-attendance__container" style={{ display: "block", padding: "2rem" }}>
      <div className="group-goal__text" style={{ top: "-4rem" }}>
        다가오는 이벤트
      </div>
      {jobInfoList.map((jobInfo) => (
        <div className="job__info__container">
          <div className="job__date">{jobInfo.date}</div>
          <div className="job__name">{jobInfo.infoName}</div>
          <a href={`${jobInfo.link}`} className="job__link">
            {jobInfo.link}
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobNotice;
