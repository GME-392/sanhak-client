import React, { useContext, useLayoutEffect, useState } from "react";
import "./ProblemsList.scss";
import { motion } from "framer-motion";
import "../ProblemItem/ProblemItem";
import { pageAnimation, fade, lineAnim } from "../../animation";

import SolvedMemberList from "../SolvedMemberList/SolvedMemberList";
import { DataContext } from "../../pages/GroupDetail";

const ProblemsList = ({
  probs = [
    { number: 2018, title: "가장 긴 증가하는 부분 수열" },
    { number: 1011, title: "하노이 탑 쌓기" },
    { number: 1743, title: "회의실 배정" },
  ],
}) => {
  const { userData } = useContext(DataContext);
  const [problemsList, setProblemsList] = useState([]);

  useLayoutEffect(() => {
    setProblemsList(probs);
    probs.forEach((problem) => {
      if (userData?.solved_problems?.includes(problem.number)) {
        setProblemsList([...problemsList, { ...problem, solved: true }]);
      } else {
        setProblemsList([...problemsList, { ...problem, solved: false }]);
      }
    });
  }, [userData]);

  return (
    <div className="problems-list__container">
      <div className="problems-list">
        <div
          style={{ width: "100%", textAlign: "left", paddingBottom: "1rem" }}
        >
          출석 과제
        </div>
        <ol className="problems-number-list">
          {probs.map((problem) => (
            <a
              href={`https://www.acmicpc.net/problem/${problem.number}`}
              target="_blank"
              className="problem_link"
              key={problem.number}
            >
              <motion.li
                className={`problems-item ${
                  problem.solved ? "solved" : "unsolved"
                }`}
                variants={fade}
              >
                {problem.number}번 - {problem.title}{" "}
                <span style={{ display: "inline-block", marginLeft: "0.5rem" }}>
                  {problem.solved ? "✅" : "❌"}
                </span>
              </motion.li>
            </a>
          ))}
        </ol>
      </div>

      {/* <SolvedMemberList /> */}
    </div>
  );
};

export default ProblemsList;
