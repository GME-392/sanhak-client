import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../../pages/GroupDetail";
import { GROUP_RANK_ENDPOINT } from "../../constants/URL";
import fairy from "../../img/fairy.png";
import first from "../../img/first.png";
import second from "../../img/second.png";
import third from "../../img/third.png";
import "./GroupRank.scss";

const GroupRank = () => {
  const { groupData } = useContext(DataContext);

  useEffect(() => {
    // fetchRank();
  }, []);

  const compareFunction = (memberA, memberB) => {
    return memberB.score - memberA.score;
  };

  console.log(Array.from(groupData?.rank_member));

  // const sortedRankMember = groupData.rank_member.sort(compareFunction);

  const rankId = Object.keys(groupData.rank_member);
  const rankContent = Object.values(groupData.rank_member);

  console.log(rankId, rankContent);

  const rankData = rankContent.map((content, idx) => ({ ...content, name: rankId[idx] }));
  console.log(rankData);

  rankData.sort(compareFunction);

  const renderMedal = (idx) => {
    switch (idx) {
      case 0:
        return <img src={first} className="rank__medal" />;
      case 1:
        return <img src={second} className="rank__medal" />;
      case 2:
        return <img src={third} className="rank__medal" />;
      default:
        return;
    }
  };

  return (
    <div className="group-attendance__container">
      <div className="group-attendance__text">{`${groupData.name} 멤버 랭킹`}</div>
      <div className="group__rank__container">
        {rankData.length > 0 ? (
          rankData.map((rank, idx) => (
            <div key={idx} className="group__rank__item">
              <div>
                {idx < 3 ? (
                  renderMedal(idx)
                ) : (
                  <span
                    style={{ display: "inline-block", marginLeft: "10px", marginRight: "10px" }}
                  >
                    {idx + 1}.{" "}
                  </span>
                )}
                <span className="rank__content">
                  {rank.name}{" "}
                  <span style={{ color: "#999", fontSize: "0.88rem" }}>({rank.boj_id})</span>{" "}
                  {rank.id} - {rank.score}점
                </span>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={fairy} className="rank__fairy" />
            <h3>알고리즘의 요정이 랭킹 정보를 계산하고 있습니다! (약 10초 소요)</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupRank;
