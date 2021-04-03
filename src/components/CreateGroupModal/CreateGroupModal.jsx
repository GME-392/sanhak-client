import {
  Button,
  Card,
  Form,
  FormLabel,
  InputGroup,
  Modal,
} from "react-bootstrap";
import React, { useState } from "react";
import Tag from "../Tag/Tag";

const CreateGroupModal = ({
  showCreateGroupModal,
  setShowCreateGroupModal,
}) => {
  const handleClose = () => setShowCreateGroupModal(false);
  const [name, setName] = useState(null);
  const [memberLimit, setMemberLimit] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [tagList, setTagList] = useState([]);

  const onPressEnter = (e) => {
    e.persist();
    if (e.key === "Enter") {
      setTagList([...tagList, tagName]);
      setTagName("");
    }
    console.log(tagList);
  };

  const removeTag = (name) => {
    console.log(name);
    setTagList(tagList.filter((tag) => tag !== name));
  };

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
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Form.Text className="text-muted">
              입력한 그룹명을 통해 사용자들이 검색할 수 있습니다.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMemberLimit">
            <Form.Label>최대 그룹원 수</Form.Label>
            <Form.Control
              type="number"
              placeholder="20"
              min={1}
              max={40}
              value={memberLimit}
              onChange={(e) => setMemberLimit(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="groupTag">
            <Form.Label>그룹 태그</Form.Label>
            <Form.Control
              type="text"
              placeholder="DFS, 취업스터디 등 그룹을 나타내는 키워드를 입력하세요"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              onKeyPress={onPressEnter}
            />
            {tagList.map((tag, idx) => (
              <Tag name={tag} key={idx} onRemove={removeTag} />
            ))}
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
