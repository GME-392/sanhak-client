import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "../aws-exports";

//Animations
import { motion } from "framer-motion";
import { pageAnimation, fade, lineAnim } from "../animation";
import { useDispatch, useSelector } from "react-redux";
import { onLoginSuccess, onLoginFail } from "../redux/actions/authActions";

Amplify.configure(awsconfig);

const initialFormState = {
  username: "",
  authCode: "",
  password: "",
  formType: "findpw",
};

const Forgot = () => {
  const [formState, updateFormState] = useState(initialFormState);
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.AppState.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthListener();
  }, []);

  // 전역 상태로 로그인 상태 관리
  const { formType } = formState;

  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          dispatch(onLoginFail());
          // updateFormState(() => ({ ...formState, formType: "signIn" }));
          break;
        default:
          break;
      }
    });
  }

  const onChange = (e) => {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  };

  async function signIn() {
    const { username, password } = formState;
    try {
      await Auth.signIn(username, password);
    } catch (error) {
      // 로그인 실패 시
      dispatch(onLoginFail());
      return;
    }
    // 로그인 성공 시
    dispatch(onLoginSuccess(username));
    history.push("/");
  }

  async function forgotPassword() {
    const { username } = formState;
    try {
      await Auth.forgotPassword(username);
    } catch (error) {
      return;
    }
    updateFormState(() => ({ ...formState, formType: "changepw" }));
  }

  async function changePassword() {
    const { authCode, username, password } = formState;
    try {
      await Auth.forgotPasswordSubmit(username, authCode, password);
    } catch (error) {
      return;
    }
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  }

  return (
    <>
      {formType === "findpw" && (
        <Work
          style={{ background: "#fff" }}
          exit="exit"
          variants={pageAnimation}
          initial="hidden"
          animate="show"
        >
          <Menu>
            <motion.h2 variants={fade}>아이디 / 비밀번호 찾기</motion.h2>
            <motion.div variants={lineAnim} className="line"></motion.div>
            <div className="login__container">
              <div className="login__input-container">
                <label htmlFor="login__id">아이디</label>
                <Input
                  name="username"
                  onChange={onChange}
                  placeholder="아이디를 입력하세요"
                ></Input>
              </div>
              <div className="login__button">
                <button onClick={forgotPassword}>찾기</button>
              </div>
            </div>
          </Menu>
        </Work>
      )}
      {formType === "changepw" && (
        <Work
          style={{ background: "#fff" }}
          exit="exit"
          variants={pageAnimation}
          initial="hidden"
          animate="show"
        >
          <Menu>
            <motion.h2 variants={fade}>비밀번호 변경</motion.h2>
            <motion.div variants={lineAnim} className="line"></motion.div>
            <div className="login__container">
              <div className="login__input-container">
                <label htmlFor="login__id">인증 코드</label>
                <Input
                  name="authCode"
                  onChange={onChange}
                  value={formState.authCode}
                  placeholder="인증 코드 6자리를 입력해 주세요"
                ></Input>
                <label htmlFor="login__pw">비밀번호</label>
                <Input
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={onChange}
                  placeholder="변경할 비밀번호를 입력하세요"
                ></Input>
              </div>
              <div className="login__button">
                <button onClick={changePassword}>확인</button>
              </div>
            </div>
          </Menu>
        </Work>
      )}

      {formType === "signIn" && <Link to="/">코맷 소개</Link>}
    </>
  );
};

const Work = styled(motion.div)`
  overflow: hidden;
  padding: 5rem 10rem;
  @media (max-width: 900px) {
    padding: 2rem 2rem;
  }

  h2 {
    padding: 1rem 0rem;
  }
`;
const Menu = styled(motion.div)`
  padding-bottom: 10rem;

  .line {
    height: 0.5rem;
    background: #40368a;
    margin-bottom: 3rem;
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;
const Hide = styled.div`
  overflow: hidden;
`;

const Input = styled.input`
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 1rem;
  width: 100%;
`;

export default Forgot;
