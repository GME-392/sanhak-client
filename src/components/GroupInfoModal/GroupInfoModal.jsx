import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Tag from "../Tag/Tag";
import { GROUP_ENDPOINT, GROUP_RANK_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GroupInfoModal.scss";
import GroupInfoMember from "../GroupInfoMember/GroupInfoMember";
import members from "../../img/members.png";
import limit from "../../img/limit.png";
import title from "../../img/title.png";
import { DataContext } from "../../pages/Group";
import fairy from "../../img/fairy.png";

const GroupInfoModal = ({ showGroupInfoModal, setShowGroupInfoModal, data }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const activeUser = useSelector((state) => state.AppState.activeUser);

  const { userData } = useContext(DataContext);
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
    setIsLoading(true);
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
      setIsLoading(false);

      setShowGroupInfoModal(false);

      await axios.patch(`${GROUP_ENDPOINT}`, {
        func: "addRankMember",
        id: id,
        new_member: [activeUser],
        boj_id: userData.boj_name,
      });

      await axios.post(`${GROUP_RANK_ENDPOINT}`, {
        id: id,
      });
    } else {
    }
  };

  return (
    <Modal show={showGroupInfoModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>그룹 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading === true ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img src={fairy} className="rank__fairy" />
            <h3>알고리즘의 요정이 그룹 문을 두들기고 있습니다!</h3>
            <h3 style={{ marginTop: "1rem" }}>조금만 기다려 주세요!</h3>
          </div>
        ) : (
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
        )}
      </Modal.Body>
      {isLoading == false ? (
        <Modal.Footer>
          <Button className="Modal__Button" variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button className="Modal__Button" onClick={joinGroup}>
            {isJoined ? "이미 참여중인 그룹입니다" : "그룹 참가"}
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default GroupInfoModal;
