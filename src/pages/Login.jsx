import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsconfig from '../aws-exports';

//Animations
import { motion } from "framer-motion";
import {
  sliderContainer,
  slider,
  pageAnimation,
  fade,
  photoAnim,
  lineAnim,
} from "../animation";

Amplify.configure(awsconfig);

const initialFormState = {
  username: '', password:'', formType:'signIn'
}

const Login = () => {

  const [formState, updateFormState] = useState(initialFormState)
  const [user, updateUser] = useState(null)
  useEffect(() => {
    checkUser()
    setAuthListener()
  }, [])

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signOut':
          updateFormState(() => ({ ...formState, formType:"signIn"}))
          break;
        default:
          break;
      }
    })
  }
  async function checkUser() {
    try{
      const user = await Auth.currentAuthenticatedUser()
      console.log('user: ', user)
      updateUser(user)
      updateFormState(() => ({ ...formState, formType:"signedIn"}))
    } catch (err) {
      // updateUser(null)
    }
  }
  function onChange(e){
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value}))
  }
  
  const {formType} = formState

  async function signIn() {
    const { username, password } = formState
    await Auth.signIn(username, password)
    updateFormState(() => ({ ...formState, formType:"signedIn"}))
  }

  return (
    <Work
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
      {
        formType === 'signIn' && (
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
          <div className="login__button">
            <Link to="/forgot">
              <div className="login__forgot">아이디/비밀번호를 잊으셨나요?</div>
            </Link>
            <div className="login__auto-container">
              <input id="login__auto" type="checkbox" />
              <label htmlFor="login__auto">자동 로그인</label>
            </div>
            <button onClick={signIn}>로그인</button>
          </div>
        </div>
      </Menu>
        )
}
{
        formType === 'signedIn' && (
          <Link to="/">코맷 소개</Link>
        )
}

    </Work>
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

export default Login;
