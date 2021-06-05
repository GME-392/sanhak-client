import React, { useState } from "react";
import ChangeGroupModal from "../ChangeGroupModal/ChangeGroupModal";
import DeleteGroupModal from "../DeleteGroupModal/DeleteGroupModal";
import ManageGroupModal from "../ManageGroupModal/ManageGroupModal";
import "./ManageGroup.scss"

const ManageGroup = ({ groupId, data }) => {
  const [showChangeGroupModal, setShowChangeroupModal] = useState(false);
  const [showManageGroupModal, setShowManageGroupModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [groupList, setGroupList] = useState([]);

  const changeModalShow = () => {
    setShowChangeroupModal(true);
  };

  const manageModalShow = () => {
    setShowManageGroupModal(true);
  };

  const deleteModalShow = () => {
    setShowDeleteGroupModal(true);
  };
  

  return (
    <div className="group-attendance__container">
      <div className="group-goal__text">
        그룹 관리
      </div>
      <div className="group-manage__btn-container">
        <button className="change" onClick={changeModalShow}>문제 유형 변경</button>
        <button className="manage" onClick={manageModalShow}>그룹원 관리</button>
        <button className="bomb" onClick={deleteModalShow}>그룹 해체</button>
      </div>

      <ChangeGroupModal
        setGroupList={setGroupList}
        showChangeGroupModal={showChangeGroupModal}
        setShowChangeroupModal={setShowChangeroupModal}
        setGroupId={groupId}
        />

      <ManageGroupModal
        showManageGroupModal={showManageGroupModal}
        setShowManageGroupModal={setShowManageGroupModal}
        setGroupId={groupId}
        setData={data}
        />

      <DeleteGroupModal
        showDeleteGroupModal={showDeleteGroupModal}
        setShowDeleteGroupModal={setShowDeleteGroupModal}
        setGroupId={groupId}
        setData={data}
        />
    </div>
  );
};

export default ManageGroup;
