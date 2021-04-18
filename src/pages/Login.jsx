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

//Bootstrap
import { Form, Button } from "react-bootstrap";

Amplify.configure(awsconfig);

const initialFormState = {
  username: "",
  password: "",
  //formType: "signIn",
};

const Login = () => {
  const [formState, updateFormState] = useState(initialFormState);
  const [idCheck, idCheckComplete] = useState(null);
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.AppState.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthListener();
  }, []);

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
    let checkIdExists = null;
    try {
      await Auth.signIn(username, password);
    } catch (error) {
      // 로그인 실패 시
      console.log("login Failed");
      dispatch(onLoginFail());
      checkIdExists = false;
      idCheckComplete(checkIdExists)
      return;
    }
    // 로그인 성공 시
    dispatch(onLoginSuccess(username));
    checkIdExists = true;
    idCheckComplete(checkIdExists)
    history.push("/");
  }

  return (
    <Container
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      {isSignedIn === false ? (
        <Menu>
          <motion.h2 variants={fade}>로그인</motion.h2>
          <motion.div variants={lineAnim} className="line"></motion.div>
          <div className="login__container">
            <div className="login__input-container">
              <label htmlFor="login__id">아이디</label>
              <Input
                name="username"
                onChange={onChange}
                placeholder="아이디 또는 이메일을 입력하세요"
              ></Input>
              <label htmlFor="login__pw">비밀번호</label>
              <Input
                name="password"
                type="password"
                onChange={onChange}
                placeholder="비밀번호를 입력하세요"
              ></Input>
            </div>
            <div className="text-muted">
              {idCheck === false && (
                <span style={{ color: "red" }}>
                {"가입하지 않은 아이디이거나, 잘못된 비밀번호입니다."}
              </span>
              )}
            </div>
            <div className="login__button">
              <Link to="/forgot">
                <div className="login__forgot">
                  아이디/비밀번호를 잊으셨나요?
                </div>
              </Link>
              <div className="login__auto-container">
                <input id="login__auto" type="checkbox" />
                <label htmlFor="login__auto">자동 로그인</label>
              </div>
              <button onClick={signIn}>로그인</button>
            </div>
          </div>
        </Menu>
      ) : (
        <Link to="/">코맷 소개</Link>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  overflow: hidden;
  padding: 3rem 10rem;
  @media (max-width: 900px) {
    padding: 2rem 2rem;
  }

  h2 {
    padding: 1rem 0rem;
  }
`;
const Menu = styled(motion.div)`
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

export default Login;
