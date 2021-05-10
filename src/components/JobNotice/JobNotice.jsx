import React, { useEffect, useState } from "react";
import "./JobNotice.scss";
import axios from "axios";
import { JOB_NOTICE_ENDPOINT } from "../../constants/URL";

const JobNotice = () => {
  const [jobInfoList, setJobInfoList] = useState([]);
  const [eventDday, setEventDday] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${JOB_NOTICE_ENDPOINT}?func=getAllNotice`).then((res) => {
      setJobInfoList(res.data);
      getDiff(res.data);
    });
  };

  const getDiff = (jobInfoList) => {
    const tempArray = [];
    const today = new Date().getTime();
    jobInfoList.forEach((jobInfo) => {
      tempArray.push(Math.floor((new Date(jobInfo.date).getTime() - today) / 86400000));
    });
    setEventDday(tempArray);
  };

  return (
    <div className="group-attendance__container" style={{ display: "block", padding: "2rem" }}>
      <div className="group-goal__text" style={{ top: "-4rem" }}>
        다가오는 이벤트
      </div>
      <div className="job__info__label__container">
        <div className="job__info__label">날짜</div>
        <div className="job__info__label">제목</div>
        <div className="job__info__label">링크</div>
      </div>
      {jobInfoList.map((jobInfo, idx) => (
        <div className="job__info__container">
          <div className="job__date">
            {jobInfo.date}{" "}
            {`(D${
              eventDday[idx] > 0 ? "-" + Math.abs(eventDday[idx]) : "+" + Math.abs(eventDday[idx])
            })`}
          </div>
          <div className="job__name">{jobInfo.infoName}</div>
          <a href={`${jobInfo.link}`} className="job__link" target="_blank">
            새 창에서 열기
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobNotice;
