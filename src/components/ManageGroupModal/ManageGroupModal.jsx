import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { USER_ENDPOINT } from "../../constants/URL";
import "./ManageGroupModal.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import fairy from "../../img/fairy.png";
import { DataContext } from "../../pages/GroupDetail";

const ManageGroupModal = ({ showManageGroupModal, setShowManageGroupModal, setGroupId, data }) => {
  const handleClose = () => setShowManageGroupModal(null);
  const [seletedMemberList, setSelectedMemberList] = useState([]);
  const [userData, setUserData] = useState(null);
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const { groupData } = useContext(DataContext);

  useEffect(() => {
    getUserData();
  }, [activeUser]);

  const getUserData = async () => {
    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      setUserData(res.data);
    });
  };

  let showMemberList = (memberList) =>
    memberList.map((name) => {
      return name !== activeUser ? (
        <div
          key={name}
          className={seletedMemberList.includes(name) ? "username__item_pressed" : "username__item"}
          onClick={(e) => {
            e.preventDefault();
            seletedMemberList.includes(name)
              ? setSelectedMemberList(seletedMemberList.filter((userName) => userName !== name))
              : setSelectedMemberList([...seletedMemberList, name]);
          }}
        >
          {name}
        </div>
      ) : (
        <div></div>
      );
    });


  const rankId = Object.keys(groupData.rank_member);
  
  const onSubmit = async () => {
    await axios.post(
      `https://ydtsc6in8g.execute-api.us-east-2.amazonaws.com/backend_api/deletegroupmember`,
      {
        name: data?.name,
        groupID: setGroupId,
        members: seletedMemberList,
      }
    );

    handleClose();
    window.location.reload();
  };

  return (
    <Modal show={showManageGroupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>그룹원 관리</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Label>탈퇴시키려는 유저의 아이디를 선택 후, 확인 버튼을 눌러주세요</Form.Label>
          {rankId.length > 0 ? showMemberList(rankId)
        : (
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

          </Form>
      </Modal.Body>

        <Modal.Footer>
          <Button className="Modal__Button cancel" variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button className="Modal__Button create" variant="primary" onClick={onSubmit}>
            확인
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default ManageGroupModal;
