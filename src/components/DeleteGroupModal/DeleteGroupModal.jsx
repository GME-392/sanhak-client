import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import "./DeleteGroupModal.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import fairy from "../../img/fairy.png";
import { DataContext } from "../../pages/GroupDetail";

const DeleteGroupModal = ({ showDeleteGroupModal, setShowDeleteGroupModal, setGroupId, setData }) => {
  const handleClose = () => setShowDeleteGroupModal(null);
  const [description, setDescription] = useState(null);
  const [falseInput, setFalseInput] = useState(false);
  const [groupType, setGroupType] = useState(null);
  const [formType, setFormType] = useState(null);
  const [testType, setTestType] = useState(null);
  const [probLevel, setProbLevel] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { groupData } = useContext(DataContext);
  const activeUser = useSelector((state) => state.AppState.activeUser);

  useEffect(() => {
    getUserData();
  }, [activeUser]);

  const getUserData = async () => {
    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      setUserData(res.data);
    });
  };

  const rankId = Object.keys(groupData.rank_member);

  const onSubmit = async () => {
    // 어쩌다 찾은 문제집 업데이트 코드
    // if(description === setGroupName){
    //  await axios.post(
    //    `https://g9eq7bmlgl.execute-api.us-east-2.amazonaws.com/backend_api/recommendprobs`,
    //   {
    //     id: setGroupId,
    //   }
    // );

    if(description === setData?.name){
      console.log(setData?.name);
      console.log(setGroupId);
      console.log(rankId);
      await axios.delete(
        `https://j49lfuutjb.execute-api.us-east-2.amazonaws.com/backend_api/deletegroup`,
       {
         data: {
         name: setData?.name,
         groupID: setGroupId,
         members: rankId
         }
       }
     );
    handleClose();

    }
    else{
      setFalseInput(true);
    }
  };

  return (
    <Modal show={showDeleteGroupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>그룹 해체</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
          <Form.Group controlId="groupDescription">
              <Form.Label>이 작업은 취소 할 수 없습니다. 정말 해체하시겠습니까?</Form.Label>
              <Form.Label>그룹을 해체하시려면 그룹 이름을 입력해주세요</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Text className="text-muted register-form__comment">
              {falseInput === true ? (
                <div style={{ color: "red" }}>
                  {"그룹 이름이 일치하지 않습니다."}
                </div>
              ) : (
                <div></div>
              )}
            </Form.Text>
            </Form.Group>

          </Form>
        
      </Modal.Body>

        <Modal.Footer>
          <Button className="Modal__Button cancel" variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button className="Modal__Button create" variant="primary" onClick={onSubmit}>
            그룹 해체
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default DeleteGroupModal;
