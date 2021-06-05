import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import "./ManageGroupModal.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import fairy from "../../img/fairy.png";
import { DataContext } from "../../pages/GroupDetail";

const ManageGroupModal = ({ showManageGroupModal, setShowManageGroupModal, setGroupId, data }) => {
  const handleClose = () => setShowManageGroupModal(null);
  const [description, setDescription] = useState(null);
  const [falseInput, setFalseInput] = useState(false);
  const [groupType, setGroupType] = useState(null);
  const [formType, setFormType] = useState(null);
  const [testType, setTestType] = useState(null);
  const [probLevel, setProbLevel] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const rankId = Object.keys(groupData.rank_member);
  console.log(rankId);
  const onSubmit = async () => {
    
  };

  return (
    <Modal show={showManageGroupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>그룹원 관리</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
          {rankId.length > 0 ? (
          rankId.map((name) => (
            <div key={name} className="group__rank__item">
              <div>
                {name}
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
