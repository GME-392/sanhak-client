import { Button, Form, Modal } from "react-bootstrap";
import React, { useContext, useState } from "react";
import Tag from "../Tag/Tag";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import "./CreateGroupModal.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { DataContext } from "../../pages/Group";

const CreateGroupModal = ({ showCreateGroupModal, setShowCreateGroupModal, setGroupList }) => {
  const handleClose = () => setShowCreateGroupModal(false);
  const [name, setName] = useState(null);
  const [memberLimit, setMemberLimit] = useState(20);
  const [tagName, setTagName] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [groupType, setGroupType] = useState(null);
  const [description, setDescription] = useState(null);
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const { userData } = useContext(DataContext);
  console.log(userData);

  const onPressEnter = (e) => {
    e.persist();
    if (e.key === "Enter") {
      setTagList([...tagList, tagName]);
      setTagName("");
    }
  };

  const removeTag = (name) => {
    setTagList(tagList.filter((tag) => tag !== name));
  };

  const onSubmit = async () => {
    const id = uuidv4();
    await axios.post(`${GROUP_ENDPOINT}`, {
      id,
      name,
      leader: activeUser,
      max_member: memberLimit,
      group_info: description,
      tag: tagList,
      status: "open",
      member: [activeUser],
      boj_id: [userData?.boj_name],
    });

    await axios.patch(`${USER_ENDPOINT}`, {
      funcname: "addGroup",
      userid: activeUser,
      groupname: name,
      groupid: id,
    });

    handleClose();
    window.location.reload(false);
  };

  return (
    <Modal show={showCreateGroupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: 500 }}>새 그룹 생성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="groupName">
            <Form.Label>그룹명</Form.Label>
            <Form.Control
              type="text"
              placeholder="그룹 이름을 4 ~ 20자 사이로 입력하세요"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Form.Text className="text-muted" style={{ fontSize: "0.88rem", marginTop: "0.5rem" }}>
              입력한 그룹명을 통해 사용자들이 검색할 수 있습니다.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="groupType">
            <Form.Label>그룹 유형</Form.Label>
            <div className="groupType__btn-container">
              <button
                className={groupType === "학습" ? "groupType__btn--pressed" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setGroupType("학습");
                }}
              >
                학습
              </button>
              <button
                className={groupType === "코딩 테스트" ? "groupType__btn--pressed" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setGroupType("코딩 테스트");
                }}
              >
                코딩 테스트
              </button>
              <button
                className={groupType === "대회" ? "groupType__btn--pressed" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setGroupType("대회");
                }}
              >
                대회
              </button>
            </div>
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

          <Form.Group controlId="groupDescription">
            <Form.Label>그룹 소개</Form.Label>
            <Form.Control
              type="text"
              placeholder="그룹을 소개하는 문구를 입력해 주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="groupTag">
            <Form.Label>그룹 태그</Form.Label>
            <Form.Control
              type="text"
              placeholder="DFS, 취업스터디 등 그룹을 나타내는 키워드를 입력하세요"
              value={tagName}
              autoComplete="off"
              onChange={(e) => setTagName(e.target.value)}
              onKeyPress={onPressEnter}
            />
            {tagList.map((tag, idx) => (
              <Tag name={tag} key={idx} onRemove={removeTag} />
            ))}
            <Form.Text className="text-muted" style={{ fontSize: "0.88rem", marginTop: "0.5rem" }}>
              불건전한 태그를 포함할 경우 경고 없이 태그가 제거될 수 있습니다.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="Modal__Button cancel" variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button className="Modal__Button create" variant="primary" onClick={onSubmit}>
          그룹 생성
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
