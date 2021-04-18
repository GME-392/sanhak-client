import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import React from "react";
import Tag from "../Tag/Tag";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import { useSelector } from "react-redux";
import "./GroupInfoModal.scss";

const GroupInfoModal = ({
  showGroupInfoModal,
  setShowGroupInfoModal,
  data,
}) => {
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const handleClose = () => setShowGroupInfoModal(false);
  const joinGroup = async () => {
    const { name, id } = data;
    await axios.patch(`${USER_ENDPOINT}userid=${activeUser}`, {
      funcname: "addGroup",
      userid: activeUser,
      groupname: name,
      groupid: id,
    });
    await axios.patch(`${GROUP_ENDPOINT}`, {
      func: "addMember",
      id: "1",
      new_member: [activeUser],
    });
    setShowGroupInfoModal(false);
  };

  return (
    <Modal show={showGroupInfoModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>그룹 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="groupName">
            <Form.Label>그룹명</Form.Label>
            <Form.Text>{data?.name}</Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMemberLimit">
            <Form.Label>최대 그룹원 수</Form.Label>
            <Form.Text>{data?.max_member}명</Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMembers">
            <Form.Label>그룹원 목록</Form.Label>
            <Form.Text>
              {data?.member?.map((member, idx) => (
                <div key={idx}>{member}</div>
              ))}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMembers">
            <Form.Label>그룹 태그</Form.Label>
            <Form.Text>
              {data?.tags?.map((tag) => (
                <Tag name={tag}></Tag>
              ))}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="Modal__Button"
          variant="secondary"
          onClick={handleClose}
        >
          취소
        </Button>
        <Button className="Modal__Button" onClick={joinGroup}>
          그룹 참가
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupInfoModal;
