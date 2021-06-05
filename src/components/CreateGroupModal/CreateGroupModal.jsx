import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Tag from "../Tag/Tag";
import { GROUP_ENDPOINT, USER_ENDPOINT } from "../../constants/URL";
import "./CreateGroupModal.scss";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import fairy from "../../img/fairy.png";

const CreateGroupModal = ({ showCreateGroupModal, setShowCreateGroupModal, setGroupList }) => {
  const handleClose = () => setShowCreateGroupModal(false);
  const [name, setName] = useState(null);
  const [memberLimit, setMemberLimit] = useState(20);
  const [tagName, setTagName] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [groupType, setGroupType] = useState(null);
  const [description, setDescription] = useState(null);
  const [formType, setFormType] = useState(null);
  const [testType, setTestType] = useState(null);
  const [probLevel, setProbLevel] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const mentList = [
    "문제집 복사하는 중...",
    "잠깐 먼 산 바라보는 중...",
    "종이의 먼지 털어내는 중...",
    "오타가 있나 검사하는 중...",
    "잠깐 커피 한 잔 하는 중...",
    "문제집이 거의 완성되었습니다...",
  ];
  const [ment, setMent] = useState(mentList[0]);

  // 대회, 기업, 문제 유형, 난이도 목록
  const codingTest = ["삼성", "카카오", "네이버", "라인", "쿠팡", "NC", "lg u+", "lg cns"];
  const contests = ["ACM-ICPC", "USACO", "정보올림피아드"];
  const levels = ["상", "중", "하"];
  const easyProbTypeList = [
    "기초 구현",
    "완전 탐색",
    "그리디",
    "BFS/DFS",
    "자료구조(스택, 큐, 덱)",
    "다이내믹 프로그래밍",
    "시뮬레이션",
    "문자열",
  ];
  const normalProbTypeList = [
    "기초구현",
    "완전탐색",
    "백트래킹",
    "그리디",
    "BFS/DFS",
    "자료구조(스택, 큐, 덱)",
    "다이내믹 프로그래밍",
    "시뮬레이션",
    "우선순위 큐",
    "이분 탐색",
    "해시",
    "투 포인터",
    "트리",
    "다익스트라",
    "위상 정렬",
    "문자열",
  ];
  const matchProbTag = {
    기초구현: "basicimplement",
    완전탐색: "bruteforce",
    백트래킹: "backtracking",
    그리디: "greedy",
    "BFS/DFS": "bfsdfs",
    "자료구조(스택, 큐, 덱)": "datastruct",
    "다이내믹 프로그래밍": "dp",
    시뮬레이션: "simul",
    "우선순위 큐": "pq",
    "이분 탐색": "binarysearch",
    해시: "hash",
    "투 포인터": "twopointer",
    트리: "tree",
    다익스트라: "dijkstra",
    "위상 정렬": "phasesort",
    문자열: "string",
  };
  const matchTestType = { 학습: "study", "코딩 테스트": "test", 대회: "contest" };
  const matchContestType = {
    삼성: "samsung",
    카카오: "kakao",
    네이버: "naver",
    라인: "line",
    NC: "nc",
    쿠팡: "coupang",
    "lg u+": "lguplus",
    "lg cns": "lgcns",
    "ACM-ICPC": "ICPC",
    USACO: "USACO",
    정보올림피아드: "KOI",
  };

  const changeMent = () => {
    let idx = 0;
    let mentTimer = setInterval(() => {
      setMent(() => mentList[idx++]);
    }, 5000);
  };

  useEffect(() => {
    getUserData();
  }, [activeUser]);

  // 코딩테스트, 대회, 난이도 목록들은 여기서 버튼으로 만들어줍니다. (단일 선택)
  let showProbList = (probList) =>
    probList.map((test, idx) => (
      <button
        className={testType === test ? "testType__btn--pressed" : ""}
        key={idx}
        onClick={(e) => {
          e.preventDefault();
          setTestType(test);
          setSelectedType([matchContestType[test]]);
        }}
      >
        {test}
      </button>
    ));

  let showProbLevelList = (levelList) =>
    levelList.map((level, idx) => (
      <button
        key={idx}
        className={probLevel === level ? "testType__btn--pressed" : ""}
        onClick={(e) => {
          e.preventDefault();
          setProbLevel(level);
        }}
      >
        {level}
      </button>
    ));

  // 문제유형 목록은 여기서 버튼으로 만들어줍니다. (다중 선택 가능)
  let showTypeList = (typeList) =>
    typeList.map((prob, idx) => (
      <button
        key={idx}
        className={selectedType.includes(matchProbTag[prob]) ? "probType__btn--pressed" : ""}
        onClick={(e) => {
          e.preventDefault();
          selectedType.includes(matchProbTag[prob])
            ? setSelectedType(selectedType.filter((name) => name !== matchProbTag[prob]))
            : setSelectedType([...selectedType, matchProbTag[prob]]);
        }}
      >
        {prob}
      </button>
    ));

  const onPressEnter = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setTagList([...tagList, tagName]);
      setTagName("");
    }
  };

  const removeTag = (name) => {
    setTagList(tagList.filter((tag) => tag !== name));
  };

  const getUserData = async () => {
    await axios.get(`${USER_ENDPOINT}userid=${activeUser}&funcname=getUser`).then((res) => {
      setUserData(res.data);
    });
  };

  const onSubmit = async () => {
    const id = uuidv4();
    setIsLoading(true);

    changeMent();
    await axios
      .post(`${GROUP_ENDPOINT}`, {
        id,
        name,
        leader: activeUser,
        max_member: memberLimit,
        group_info: description,
        tag: tagList,
        status: "open",
        member: [activeUser],
        boj_id: [userData.boj_name],
        group_type: matchTestType[groupType], //그룹 유형 ex. "대회", "코딩 테스트"
        // test_type: testType, // 테스트 유형 (그룹이 대회, 테스트인 경우 한정) ex. "카카오"
        // prob_level: probLevel, // 난이도 (그룹이 학습인 경우 한정) ex. "상","하"
        // probTypeset: selectedType, // 선택된 문제 유형들 (그룹이 학습인 경우 한정, 배열 형태)
      })
      .then(async (res) => {
        await axios.patch(`${GROUP_ENDPOINT}`, {
          func: "updateProblemNumber",
          id: res.data.body,
          prob_num: 3,
        });
        await axios.post(
          `https://pj6kuuwo4e.execute-api.us-east-2.amazonaws.com/backend_api/getproblemset`,
          {
            id: res.data.body,
            diff: probLevel,
            arr: selectedType,
            goal: matchTestType[groupType], //test, contest, study
          }
        );
        await axios.post(
          `https://g9eq7bmlgl.execute-api.us-east-2.amazonaws.com/backend_api/recommendprobs`,
          {
            id: res.data.body,
          }
        );
        await axios.post(
          `https://ycwvl0727g.execute-api.us-east-2.amazonaws.com/backend_api/return-rank`,
          {
            id: res.data.body,
          }
        );
      });
    await axios.patch(`${USER_ENDPOINT}`, {
      funcname: "addGroup",
      userid: activeUser,
      groupname: name,
      groupid: id,
    });
    setIsLoading(false);
    handleClose();
    window.location.reload(false);
  };

  return (
    <Modal show={showCreateGroupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>새 그룹 생성하기</Modal.Title>
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
            <h3>알고리즘의 요정이 그룹을 만들고 있습니다!</h3>
            <div style={{ fontSize: "18px", marginTop: "1rem" }}>{ment}</div>
          </div>
        ) : (
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
              <Form.Text className="text-muted">
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
                    setFormType("학습");
                  }}
                >
                  학습
                </button>
                <button
                  className={groupType === "코딩 테스트" ? "groupType__btn--pressed" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setGroupType("코딩 테스트");
                    setFormType("코딩 테스트");
                  }}
                >
                  코딩 테스트
                </button>
                <button
                  className={groupType === "대회" ? "groupType__btn--pressed" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setGroupType("대회");
                    setFormType("대회");
                  }}
                >
                  대회
                </button>
              </div>
            </Form.Group>

            {/* 바뀐 부분 : 그룹 유형 버튼 선택에 따라 아래 추가 정보 선택 기능 */}
            <Form.Group controlId="groupType">
              {formType === "학습" && (
                <div>
                  <Form.Label>문제 수준</Form.Label>
                  <div className="testType__btn-container">{showProbLevelList(levels)}</div>
                  <Form.Label style={{ marginTop: "10px" }}>
                    문제 유형 (여러개 선택 가능)
                  </Form.Label>
                  <div className="probType__btn-container">
                    {probLevel === "하"
                      ? showTypeList(easyProbTypeList)
                      : showTypeList(normalProbTypeList)}
                  </div>
                </div>
              )}
              {formType === "코딩 테스트" && (
                <div>
                  <Form.Label>기업 목록</Form.Label>
                  <div className="testType__btn-container">{showProbList(codingTest)}</div>
                </div>
              )}
              {formType === "대회" && (
                <div>
                  <Form.Label>대회 목록</Form.Label>
                  <div className="testType__btn-container">{showProbList(contests)}</div>
                </div>
              )}
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
              <Form.Text className="text-muted">
                불건전한 태그를 포함할 경우 경고 없이 태그가 제거될 수 있습니다.
              </Form.Text>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>

      {isLoading !== true ? (
        <Modal.Footer>
          <Button className="Modal__Button cancel" variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button className="Modal__Button create" variant="primary" onClick={onSubmit}>
            그룹 생성
          </Button>
        </Modal.Footer>
      ) : (
        <div></div>
      )}
    </Modal>
  );
};

export default CreateGroupModal;
