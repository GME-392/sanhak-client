import React, {useState, useEffect} from 'react'
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Switch, Route, useLocation } from "react-router-dom";
import Login from "../../pages/Login";

Amplify.configure(awsconfig);

const initialFormState = {
  username: '', bojid: '', email:'', password:'', confirmpassword:'', authCode:'', formType:'signUp'
}

const RegisterForm = () => {

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
          updateFormState(() => ({ ...formState, formType:"signUp"}))
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

  async function signUp() {
    const { username, bojid, email, password, confirmpassword } = formState
    await Auth.signUp({ username, password, attributes: { email }})
    updateFormState(() => ({ ...formState, formType:"confirmSignUp"}))
  }

  async function confirmSignUp() {
    const { username, authCode } = formState
    await Auth.confirmSignUp(username, authCode)
    updateFormState(() => ({ ...formState, formType:"signIn"}))
  }

  async function signIn() {
    const { username, password } = formState
    await Auth.signIn(username, password)
    updateFormState(() => ({ ...formState, formType:"signedIn"}))
  }


  return (
    <>
    {
    formType === 'signUp' && (
    <Form className="Register-form">
      <Form.Group controlId="id">
        <Form.Label>아이디</Form.Label>
        <Form.Control type="text" name="username" onChange={onChange} placeholder="아이디를 입력해 주세요" />
        <Form.Text className="text-muted">
          아이디는 로그인에 사용되며, 다른 사용자들에게 공개됩니다.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="bojId">
        <Form.Label>백준 온라인 저지 아이디</Form.Label>
        <Form.Control type="text" name="bojid" onChange={onChange} placeholder="백준 온라인 저지 아이디를 입력해 주세요"/>
        <Form.Text className="text-muted">
          아이디가 없다면, 먼저{" "}
          <a href="https://www.acmicpc.net/" target="_blank">
            https://www.acmicpc.net/
          </a>{" "}
          에서 가입해 주세요.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>이메일</Form.Label>
        <Form.Control type="email" name="email" onChange={onChange} placeholder="이메일을 입력해 주세요" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="text" name="password" onChange={onChange} placeholder="비밀번호를 입력해 주세요" />
        <Form.Text className="text-muted">
          비밀번호는 8 ~ 16자 사이의 영어 + 숫자 조합으로 만들어 주세요.
        </Form.Text>
      </Form.Group>{" "}
      <Form.Group controlId="confirmPassword">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control
          type="password"
          name="confirmpassword" onChange={onChange}
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
      </Form.Group>
      <Button className="Register-button" onClick={signUp}>
        회원가입
      </Button>
    </Form>
    )
    }
    {
      formType === 'confirmSignUp' && (
        <Form>
        <Form.Control name="authCode" onChange={onChange} placeholder="인증 코드 6자리를 입력해 주세요" />
        <Button onClick={confirmSignUp}>확인</Button>
        </Form>
        )
    }
    {
      formType === 'signIn' && (
        <Link to="/login">로그인</Link>
      )
    }
  </>
  );
};

export default RegisterForm;
