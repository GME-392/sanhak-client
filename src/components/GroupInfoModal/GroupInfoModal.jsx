import {
  Button,
  Card,
  Form,
  FormLabel,
  InputGroup,
  Modal,
} from "react-bootstrap";
import React from "react";
import Tag from "../Tag/Tag";

const GroupInfoModal = ({
  showGroupInfoModal,
  setShowGroupInfoModal,
  data,
}) => {
  const handleClose = () => setShowGroupInfoModal(false);

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
              {data?.members.map((member) => (
                <div>{member}</div>
              ))}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMembers">
            <Form.Label>그룹 태그</Form.Label>
            <Form.Text>
              {data?.tags.map((tag) => (
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
        <Button
          className="Modal__Button"
          variant="primary"
          onClick={handleClose}
        >
          그룹 참여 신청
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupInfoModal;
