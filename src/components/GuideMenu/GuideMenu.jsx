import React, { useEffect, useState } from "react";
import "./GuideMenu.scss";
import { GROUP_ENDPOINT } from "../../constants/URL";
import Tag from "../Tag/Tag";
import RecommendedGroup from "../RecommendedGroup/RecommendedGroup";
import axios from "axios";

const GuideMenu = ({ type }) => {
  const [groupList, setGroupList] = useState([]);
  const [tagList, setTagList] = useState([]);

  const getGroupList = async () => {
    await axios
      .get(`${GROUP_ENDPOINT}?func=getAllGroup`)
      .then((res) => setGroupList(res.data.Items));
  };

  useEffect(() => {
    getGroupList();
  }, []);

  const renderContent = () => {
    switch (type) {
      case "contest":
        return (
          <div className="Guide__content__container">
            <h3 className={`GuideMenu__title title--${type}`}>
              👍 이런 분들께 추천드려요
            </h3>
            <ul className="Guide__content__list">
              <li>권장 : 코맷 레이팅 1000점, 또는 Solved.ac Silver I 이상</li>
              <li>트리, 그래프 등의 고급 자료구조에 대한 이해가 있으신 분</li>
              <li>알고리즘 대회에 처음 도전해보시는 분</li>
            </ul>
            <h3
              className={`GuideMenu__title title--${type}`}
              style={{ marginTop: "2.5rem" }}
            >
              🎨 관련 태그
            </h3>
            <div className="Guide__tag__container">
              <Tag
                name={"SCPC"}
                onAddTag={() => {
                  setTagList([...tagList, "SCPC"]);
                }}
              />
              <Tag
                name={"CodeJam"}
                onAddTag={() => setTagList([...tagList, "CodeJam"])}
              />
              <Tag
                name={"ACM-ICPC"}
                onAddTag={() => setTagList([...tagList, "ACM-ICPC"])}
              />
              <Tag
                name={"TopCoder"}
                onAddTag={() => setTagList([...tagList, "TopCoder"])}
              />
              <Tag
                name={"CodeForce"}
                onAddTag={() => setTagList([...tagList, "CodeForce"])}
              />
            </div>
            <div className="Guide__button__container">
              <button className={`Guide__button Guide__button`}>
                태그로 그룹 찾기
              </button>
              <button className={`Guide__button Guide__button--secondary`}>
                그룹 생성하기
              </button>
            </div>
          </div>
        );
      case "study":
        return (
          <div className="Guide__content__container">
            <h3 className={`GuideMenu__title title--${type}`}>
              👍 이런 분들께 추천드려요
            </h3>
            <ul className="Guide__content__list">
              <li>코딩에 흥미를 느끼는 누구나!</li>
              <li>프로그래밍 언어에 처음 입문하는 분</li>
              <li>다양한 문제를 풀면서 프로그래밍 문법을 익히고자 하는 분</li>
            </ul>
            <h3
              className={`GuideMenu__title title--${type}`}
              style={{ marginTop: "2.5rem" }}
            >
              🎨 관련 태그
            </h3>
            <div className="Guide__tag__container">
              <Tag
                name={"파이썬"}
                onAddTag={() => setTagList([...tagList, "파이썬"])}
              />
              <Tag
                name={"C++"}
                onAddTag={() => setTagList([...tagList, "C++"])}
              />
              <Tag
                name={"대학생"}
                onAddTag={() => setTagList([...tagList, "대학생"])}
              />
              <Tag
                name={"자바"}
                onAddTag={() => setTagList([...tagList, "자바"])}
              />
              <Tag
                name={"기초"}
                onAddTag={() => setTagList([...tagList, "기초"])}
              />
              <Tag
                name={"연습"}
                onAddTag={() => setTagList([...tagList, "연습"])}
              />
            </div>
            <div className="Guide__button__container">
              <button className={`Guide__button Guide__button`}>
                태그로 그룹 찾기
              </button>
              <button className={`Guide__button Guide__button--secondary`}>
                그룹 생성하기
              </button>
            </div>
          </div>
        );
      case "job":
        return (
          <div className="Guide__content__container">
            <h3 className={`GuideMenu__title title--${type}`}>
              👍 이런 분들께 추천드려요
            </h3>
            <ul className="Guide__content__list">
              <li>권장 : 코맷 레이팅 800점, 또는 Solved.ac Silver IV 이상</li>
              <li>스택, 큐 등의 자료구조에 대한 기본적인 이해가 있는 분</li>
              <li>IT계열 대기업 및 소프트웨어 직렬 취업을 준비하는 분</li>
            </ul>
            <h3
              className={`GuideMenu__title title--${type}`}
              style={{ marginTop: "2.5rem" }}
            >
              🎨 관련 태그
            </h3>
            <div className="Guide__tag__container">
              <Tag
                name={"삼성"}
                onAddTag={() => setTagList([...tagList, "삼성"])}
              />
              <Tag
                name={"LG"}
                onAddTag={() => setTagList([...tagList, "LG"])}
              />
              <Tag
                name={"카카오"}
                onAddTag={() => setTagList([...tagList, "카카오"])}
              />
              <Tag
                name={"네이버"}
                onAddTag={() => setTagList([...tagList, "네이버"])}
              />
              <Tag
                name={"대기업"}
                onAddTag={() => setTagList([...tagList, "대기업"])}
              />
              <Tag
                name={"코테"}
                onAddTag={() => setTagList([...tagList, "코테"])}
              />
            </div>
            <div className="Guide__button__container">
              <button className={`Guide__button Guide__button`}>
                태그로 그룹 찾기
              </button>
              <button className={`Guide__button Guide__button--secondary`}>
                그룹 생성하기
              </button>
            </div>
            <div></div>
          </div>
        );

      default:
        return;
    }
  };
  return (
    <div className="GuideMenu__container">
      {renderContent()}
      <div style={{ marginLeft: "5rem", width: "300px" }}>
        <h3
          className={`GuideMenu__title title--${type}`}
          style={{ marginBottom: "1rem" }}
        >
          🖥 추천 그룹 목록
        </h3>
        <div className="Guide__recommended__list">
          {tagList.length > 0
            ? groupList
                ?.filter((group) => {
                  let include = false;
                  tagList.forEach((tag) => {
                    if (group.tag.includes(tag)) include = true;
                  });
                  return include;
                })
                .map((group, idx) => {
                  if (idx > 3) return;
                  return <RecommendedGroup key={idx} data={group} />;
                })
            : groupList.map((group, idx) => {
                if (idx > 3) return;
                return <RecommendedGroup key={idx} data={group} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default GuideMenu;
