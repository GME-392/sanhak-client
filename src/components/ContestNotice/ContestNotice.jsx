import React, { useEffect, useState } from "react";
import "./ContestNotice.scss";
import axios from "axios";
import { CONTEST_NOTICE_ENDPOINT } from "../../constants/URL";

const ContestNotice = () => {
  const [contestInfoList, setContestInfoList] = useState([]);
  const [eventDday, setEventDday] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${CONTEST_NOTICE_ENDPOINT}?func=getAllInfo`).then((res) => {
      setContestInfoList(res.data);
      getDiff(res.data);
    });
  };

  const getDiff = (contestInfoList) => {
    const tempArray = [];
    const today = new Date().getTime();
    contestInfoList.forEach((jobInfo) => {
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
        <div className="job__info__label">공고 링크</div>
      </div>
      {contestInfoList.map((contestInfo, idx) => (
        <div className="job__info__container">
          <div className="job__date">
            {contestInfo.date}{" "}
            {`(D${
              eventDday[idx] > 0 ? "-" + Math.abs(eventDday[idx]) : "+" + Math.abs(eventDday[idx])
            })`}
          </div>
          <div className="job__name">{contestInfo.infoName}</div>
          <a href={`${contestInfo.link}`} className="job__link" target="_blank">
            새 창에서 열기
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContestNotice;
