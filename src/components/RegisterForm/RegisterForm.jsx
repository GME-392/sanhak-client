import React, { useState, useEffect } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { USER_ENDPOINT } from "../../constants/URL";
import RegisterSuccess from "../RegisterSuccess/RegisterSuccess";
import axios from "axios";
import "./RegisterForm.scss";

Amplify.configure(awsconfig);

const initialFormState = {
  username: "",
  bojname: "",
  email: "",
  organization: "",
  password: "",
  confirmpassword: "",
  authCode: "",
  formType: "signUp",
};

const RegisterForm = ({ setRegisterSuccess }) => {
  const [formState, updateFormState] = useState(initialFormState);
  const [idExists, setIdExists] = useState(null);
  const [bojIdExists, setBojIdExists] = useState(null);
  const [passwordConfirmed, setPasswordConfirmed] = useState(null);
  const [userListOnDB, setUserListOnDB] = useState([]);
  const [formCheckComplete, setFormCheckComplete] = useState(false);
  const [alertType, setAlertType] = useState(null);

  // 전역 상태로 로그인 상태 관리
  const { formType } = formState;

  useEffect(() => {
    validateForm();
  }, [
    formState.username,
    formState.password,
    formState.confirmpassword,
    formState.email,
    formState.bojname,
    idExists,
    bojIdExists,
    passwordConfirmed,
  ]);

  const validateUsername = async () => {
    await axios.get(`${USER_ENDPOINT}/&funcname=getAllUsers`).then((res) => {
      let checkIdExists = null;
      const userList = res.data.Items;
      userList.forEach((userData) => {
        if (userData?.user_id === formState?.username) {
          checkIdExists = true;
        }
      });
      if (checkIdExists === null) {
        checkIdExists = false;
      }
      setIdExists(checkIdExists);
    });
  };

  const validateBojname = async () => {
    await axios.get(`${USER_ENDPOINT}/&funcname=getAllUsers`).then((res) => {
      let checkBojIdExists = null;
      const userList = res.data.Items;
      userList.forEach((userData) => {
        if (userData?.boj_name === formState?.bojname) {
          checkBojIdExists = true;
        }
      });
      if (checkBojIdExists === null) {
        checkBojIdExists = false;
      }
      setBojIdExists(checkBojIdExists);
    });
  };

  const validateForm = () => {
    if (
      idExists === false &&
      bojIdExists === false &&
      passwordConfirmed === true &&
      formState.password !== null &&
      formState.confirmpassword !== null &&
      formState.bojname !== null &&
      formState.username !== null &&
      formState.email !== null
    ) {
      setFormCheckComplete((prev) => !prev);
    }
  };

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  function checkPassword(e) {
    if (formState.password !== formState.confirmpassword) {
      setPasswordConfirmed(false);
    } else {
      setPasswordConfirmed(true);
    }
  }

  async function signUp() {
    const { username, bojname, email, password, confirmpassword } = formState;
    await Auth.signUp({ username, password, attributes: { email } });

    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }

  async function confirmSignUp() {
    const { username, authCode } = formState;
    updateFormState(() => ({ ...formState, formType: "signIn" }));
    Auth.confirmSignUp(username, authCode)
    .then(() => {
      axios.post(`${USER_ENDPOINT}`, {
        userid: formState.username,
        bojname: formState.bojname,
        userpw: formState.password,
        useremail: formState.email,
        organization: formState.organization,
      });
    })
    .catch(err => {
      //alert("인증 코드가 일치하지 않습니다!"); 
      setAlertType("notCorrespond");
      updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
    })
    
  }

  async function resendSignUp() {
    const { username } = formState;
    await Auth.resendSignUp(username);
    setAlertType("resend");
  }

  return (
    <>
      {formType === "signUp" && (
        <Form className="Register-form">
          <Form.Group controlId="id">
            <Form.Label>아이디</Form.Label>
            <div className="register-form__container">
              <Form.Control
                type="text"
                placeholder="아이디를 입력해 주세요"
                name="username"
                onChange={onChange}
                value={formState.username}
                style={{ display: "inline-block" }}
              />
              <Button onClick={validateUsername}>중복 확인</Button>
            </div>
            <Form.Text className="text-muted register-form__comment">
              {idExists === null ? (
                "아이디는 로그인에 사용되며, 다른 사용자들에게 공개됩니다."
              ) : idExists === true ? (
                <div style={{ color: "red" }}>
                  {"이미 등록된 아이디입니다."}
                </div>
              ) : (
                <div style={{ color: "green" }}>
                  {"사용 가능한 아이디입니다."}
                </div>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="bojname">
            <Form.Label>백준 온라인 저지 아이디</Form.Label>
            <div className="register-form__container">
              <Form.Control
                type="text"
                placeholder="백준 온라인 저지 아이디를 입력해 주세요"
                name="bojname"
                value={formState.bojname}
                onChange={onChange}
              />
              <Button onClick={validateBojname}>중복 확인</Button>
            </div>
            <Form.Text className="text-muted register-form__comment">
              {bojIdExists === null ? (
                <div>
                  아이디가 없다면, 먼저{" "}
                  <a href="https://www.acmicpc.net/" target="_blank">
                    https://www.acmicpc.net/
                  </a>{" "}
                  에서 가입해 주세요.
                </div>
              ) : bojIdExists === true ? (
                <div style={{ color: "red" }}>
                  {"이미 등록된 아이디입니다."}
                </div>
              ) : (
                <div style={{ color: "green" }}>
                  {"사용 가능한 아이디입니다."}
                </div>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formState.email}
              onChange={onChange}
              placeholder="이메일을 입력해 주세요"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={formState.password}
              onChange={onChange}
              placeholder="비밀번호를 입력해 주세요"
            />
            <Form.Text className="text-muted register-form__comment">
              비밀번호는 8 ~ 16자 사이의 영어 + 숫자 조합으로 만들어 주세요.
            </Form.Text>
          </Form.Group>{" "}
          <Form.Group controlId="confirmPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              name="confirmpassword"
              value={formState.confirmpassword}
              onChange={onChange}
              onKeyUp={checkPassword}
              placeholder="비밀번호를 한번 더 입력해 주세요"
            />
            <Form.Text className="text-muted register-form__comment">
              {passwordConfirmed === null ? (
                <div></div>
              ) : passwordConfirmed === true ? (
                <div style={{ color: "green" }}>{"비밀번호가 일치합니다."}</div>
              ) : (
                <div style={{ color: "red" }}>
                  {"비밀번호가 일치하지 않습니다."}
                </div>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="organization">
            <Form.Label>소속 (선택)</Form.Label>
            <Form.Control
              type="text"
              name="organization"
              value={formState.organization}
              onChange={onChange}
              placeholder="소속 학교/직장을 입력해 주세요"
            />
          </Form.Group>
          <Button
            className="Register-button"
            onClick={signUp}
            disabled={!formCheckComplete}
          >
            회원가입
          </Button>
        </Form>
      )}
      {formType === "confirmSignUp" && (
        <Form className="Register-form">
          <Form.Group controlId="confirmSignUp">
            <Form.Label>인증 코드 입력</Form.Label>
            <div className="register-form__container">
              <Form.Control
                type="text"
                placeholder="인증 코드 6자리를 입력해 주세요"
                name="authCode"
                onChange={onChange}
                value={formState.authCode}
                style={{ display: "inline-block" }}
              />
              <Button onClick={confirmSignUp}>확인</Button>
              <Button onClick={resendSignUp}>인증번호 재전송</Button>
            </div>
            <Form.Text className="text-muted register-form__comment">
              {alertType === "notCorrespond" ? (
                <div style={{ color: "red" }}>
                {"인증 코드가 일치하지 않습니다."}
              </div>
              ) : alertType === "resend" ? (
                <div style={{ color: "green" }}>{"인증 코드를 다시 전송했습니다."}</div>
              ) : (
                <div></div>
              )}
            </Form.Text>
          </Form.Group>
        </Form>
      )}
      {formType === "signIn" && <RegisterSuccess />}
    </>
  );
};

export default RegisterForm;
