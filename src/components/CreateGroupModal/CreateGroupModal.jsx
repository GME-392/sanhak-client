import {
  Button,
  Card,
  Form,
  FormLabel,
  InputGroup,
  Modal,
} from "react-bootstrap";
import React from "react";

const CreateGroupModal = ({
  showCreateGroupModal,
  setShowCreateGroupModal,
}) => {
  const handleClose = () => setShowCreateGroupModal(false);

  return (
    <Modal show={showCreateGroupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 그룹 생성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="groupName">
            <Form.Label>그룹명</Form.Label>
            <Form.Control
              type="text"
              placeholder="그룹 이름을 4 ~ 20자 사이로 입력하세요"
            />
            <Form.Text className="text-muted">
              입력한 그룹명을 통해 사용자들이 검색할 수 있습니다.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMemberLimit">
            <Form.Label>최대 그룹원 수</Form.Label>
            <Form.Control type="number" placeholder="20" min={1} max={40} />
          </Form.Group>

          <Form.Group controlId="groupTag">
            <Form.Label>그룹 태그</Form.Label>
            <Form.Control
              type="text"
              placeholder="DFS, 취업스터디 등 그룹을 나타내는 키워드를 입력하세요"
            />
            <Form.Text className="text-muted">
              불건전한 태그를 포함할 경우 경고 없이 태그가 제거될 수 있습니다.
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
          그룹 생성
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
