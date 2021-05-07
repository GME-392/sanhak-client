import React, { useContext, useState } from "react";
import "./GroupGoal.scss";
import ProblemsList from "../ProblemsList/ProblemsList";
import SolvedMemberList from "../SolvedMemberList/SolvedMemberList";
import GroupNotification from "../GroupNotification/GroupNotification";
import Modal from "react-modal";

const GroupGoal = () => {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  function openModal() {
    setLeaveModalOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setLeaveModalOpen(false);
  }

  return (
    <div className="group-goal__container">
      <div className="group-goal__text">
        {`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 - 오늘의 목표`}
      </div>
      <ProblemsList />
      <GroupNotification />
      <button className="group-leave" onClick={openModal}>
        그룹 나가기
      </button>
      <Modal
        style={{ width: "300px !important" }}
        isOpen={leaveModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className="group__leave__modal">
          <h2>그룹을 탈퇴하시겠습니까?</h2>
          <div className="group__leave__modal__content">
            <div>
              탈퇴 시, 동일한 그룹에는 일주일간 재가입할 수 없습니다.
              <br />
              그래도 탈퇴하시겠어요?
            </div>
            <div></div>
          </div>
          <div className="group__leave__btn__container" style={{ marginTop: "30px" }}>
            <button onClick={closeModal} className="button--stay">
              아뇨, 다시 생각해 볼게요!
            </button>
            <button className="button--leave" style={{ marginTop: "10px" }}>
              네, 탈퇴하겠습니다.
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GroupGoal;
