import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Tag from "../Tag/Tag";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GroupInfoModal.scss";
import GroupInfoMember from "../GroupInfoMember/GroupInfoMember";
import members from "../../img/members.png";
import limit from "../../img/limit.png";
import title from "../../img/title.png";

const GroupInfoModal = ({ showGroupInfoModal, setShowGroupInfoModal, data }) => {
  const [isJoined, setIsJoined] = useState(false);
  const activeUser = useSelector((state) => state.AppState.activeUser);
  // 모달 닫는 함수
  const handleClose = () => setShowGroupInfoModal(false);
  const history = useHistory();

  useEffect(() => {
    if (data !== null) {
      const { member } = data;
      member.forEach((member) => {
        if (member === activeUser) {
          setIsJoined(true);
        }
      });
    }
    return () => setIsJoined(false);
  }, [showGroupInfoModal]);

  const joinGroup = async () => {
    const { name, id } = data;
    if (activeUser === null || activeUser === undefined) {
      let moveToSignUp = window.confirm(
        "회원가입이 필요한 서비스입니다. 회원가입 페이지로 이동하시겠습니까?"
      );
      if (moveToSignUp === true) {
        history.push("/login");
      }
      return;
    }

    if (isJoined === false) {
      await axios.patch(`${USER_ENDPOINT}userid=${activeUser}`, {
        funcname: "addGroup",
        userid: activeUser,
        groupname: name,
        groupid: id,
      });

      await axios.patch(`${GROUP_ENDPOINT}`, {
        func: "addMember",
        id: id,
        new_member: [activeUser],
      });

      setShowGroupInfoModal(false);
      window.location.reload(false);
    } else {
    }
  };

  return (
    <Modal show={showGroupInfoModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>그룹 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="groupName">
            <Form.Label>
              <img src={title} width={20} style={{ marginRight: "0.5rem" }} />
              그룹명
            </Form.Label>
            <Form.Text>{data?.name}</Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMemberLimit">
            <Form.Label>
              <img src={limit} width={18} style={{ marginRight: "0.6rem" }} />
              최대 그룹원 수
            </Form.Label>
            <Form.Text>{data?.max_member}명</Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMembers">
            <Form.Label>
              <img src={members} width={20} style={{ marginRight: "0.5rem" }} />
              그룹원 목록
            </Form.Label>
            <Form.Text>
              <GroupInfoMember master={true} name={data?.leader} />
              {data?.member?.map((member, idx) => {
                if (data?.leader !== member) {
                  return <GroupInfoMember master={false} name={member} key={idx} />;
                }
              })}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="groupMembers">
            <Form.Label>그룹 태그</Form.Label>
            <Form.Text style={{ marginTop: "-0.5rem" }}>
              {data?.tag?.map((tag, idx) => (
                <Tag key={idx} name={tag}></Tag>
              ))}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="Modal__Button" variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button className="Modal__Button" onClick={joinGroup}>
          {isJoined ? "이미 참여중인 그룹입니다" : "그룹 참가"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GroupInfoModal;
