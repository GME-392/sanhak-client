import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./GroupNotification.scss";
import { DataContext } from "../../pages/GroupDetail";
import gear from "../../img/settings.png";
import axios from "axios";
import { GROUP_ENDPOINT } from "../../constants/URL";

const GroupNotification = () => {
  const { groupData, userData, isMaster } = useContext(DataContext);
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [groupNoti, setGroupNoti] = useState("");

  useEffect(() => {
    setGroupNoti(() => groupData.group_noti);
  }, []);

  const changeNotification = async () => {
    await axios.patch(`${GROUP_ENDPOINT}`, {
      func: "updateGroupNotice",
      id: groupData.id,
      group_noti: groupNoti,
    });
    setGroupNoti(groupNoti);
  };

  return (
    <div className="group-notification-container">
      <div className="problems-list">
        <div style={{ width: "100%", textAlign: "left", paddingBottom: "1rem" }}>
          그룹 공지사항
          {isMaster && (
            <span className="notification__modify" onClick={() => setIsChangeMode((prev) => !prev)}>
              <img
                src={gear}
                width={20}
                style={{ width: "12px", height: "12px", marginRight: "4px" }}
              ></img>
              수정
            </span>
          )}
        </div>
      </div>
      {!isChangeMode ? (
        <div className="group-notification-content">{groupNoti ?? groupData.group_noti}</div>
      ) : (
        <div style={{ display: "flex", width: "calc(100% - 3rem)" }}>
          <textarea
            className="group-notification-input"
            value={groupNoti}
            onChange={(e) => setGroupNoti(e.target.value)}
          ></textarea>
          <button className="group-notification-button group-notification-button--cancel">
            수정 취소
          </button>
          <button
            className="group-notification-button group-notification-button--confirm"
            onClick={changeNotification}
          >
            수정 완료
          </button>
        </div>
      )}

      {/* <SolvedMemberList /> */}
    </div>
  );
};

export default GroupNotification;
