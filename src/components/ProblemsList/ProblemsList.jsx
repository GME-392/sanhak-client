import React, { useContext, useEffect, useState } from "react";
import "./ProblemsList.scss";
import { motion } from "framer-motion";
import "../ProblemItem/ProblemItem";
import { fade } from "../../animation";

import { DataContext } from "../../pages/GroupDetail";

const ProblemsList = () => {
  const { groupData, userData } = useContext(DataContext);
  const [problemsList, setProblemsList] = useState([]);

  useEffect(() => {
    const { probs } = groupData?.group_attendance ?? { probs: [] };
    if (probs.length > 0) {
      setProblemsList(
        probs.map((problem) => {
          if (userData?.solved_problems?.includes(problem.numb)) {
            return { ...problem, solved: true };
          } else {
            return { ...problem, solved: false };
          }
        })
      );
    }
  }, [groupData, userData]);
  return (
    <div className="problems-list__container">
      <div className="problems-list">
        <div style={{ width: "100%", textAlign: "left", paddingBottom: "1rem" }}>출석 과제</div>
        <ol className="problems-number-list">
          {problemsList.map((problem) => (
            <a
              href={`https://www.acmicpc.net/problem/${problem.numb}`}
              target="_blank"
              className="problem_link"
              key={problem.numb}
            >
              <motion.li
                className={`problems-item ${problem.solved ? "solved" : "unsolved"}`}
                variants={fade}
              >
                {problem.numb}번 - {problem.name}{" "}
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
