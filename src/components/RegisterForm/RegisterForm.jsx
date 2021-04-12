import React, { useState, useEffect } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { USER_ENDPOINT } from "../../constants/URL";
import axios from "axios";
import "./RegisterForm.scss";

Amplify.configure(awsconfig);

const initialFormState = {
  username: "",
  bojname: "",
  email: "",
  password: "",
  confirmpassword: "",
  authCode: "",
  formType: "signUp",
};

const RegisterForm = () => {
  const [formState, updateFormState] = useState(initialFormState);
  const [idExists, setIdExists] = useState(null);
  const [bojIdExists, setBojIdExists] = useState(null);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [userListOnDB, setUserListOnDB] = useState([]);
  const [formCheckComplete, setFormCheckComplete] = useState(false);

  // 전역 상태로 로그인 상태 관리
  const { formType } = formState;

  useEffect(() => {
    validateForm();
  }, [idExists, bojIdExists]);

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

  const checkPasswordMatches = () => {
    if (formState.password !== formState.confirmpassword) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (
      idExists === false &&
      bojIdExists === false &&
      formState.password === formState.confirmpassword
    ) {
      setPasswordConfirmed(true);
    }
  };

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  async function signUp() {
    const { username, bojname, email, password, confirmpassword } = formState;
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }

  async function confirmSignUp() {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
    await axios.post(`${USER_ENDPOINT}`, {
      userid: formState.username,
      bojname: formState.bojname,
      userpw: formState.password,
      useremail: formState.email,
    });
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
            <Form.Text className="text-muted">
              {idExists === null ? (
                "아이디는 로그인에 사용되며, 다른 사용자들에게 공개됩니다."
              ) : idExists === true ? (
                <span style={{ color: "red" }}>
                  {"이미 등록된 아이디입니다."}
                </span>
              ) : (
                <span style={{ color: "green" }}>
                  {"사용 가능한 아이디입니다."}
                </span>
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
            {bojIdExists === null ? (
              <Form.Text className="text-muted">
                아이디가 없다면, 먼저{" "}
                <a href="https://www.acmicpc.net/" target="_blank">
                  https://www.acmicpc.net/
                </a>{" "}
                에서 가입해 주세요.
              </Form.Text>
            ) : bojIdExists === true ? (
              <span style={{ color: "red" }}>
                {"이미 등록된 아이디입니다."}
              </span>
            ) : (
              <span style={{ color: "green" }}>
                {"사용 가능한 아이디입니다."}
              </span>
            )}
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
            <Form.Text className="text-muted">
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
              placeholder="비밀번호를 한번 더 입력해 주세요"
            />
          </Form.Group>
          <Button
            className="Register-button"
            onClick={signUp}
            // disabled={!formCheckComplete}
          >
            회원가입
          </Button>
        </Form>
      )}
      {formType === "confirmSignUp" && (
        <Form className="Register-form">
          <Form.Group controlId= "confirmSignUp">
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
          </div>
          </Form.Group>
        </Form>
      )}
      {formType === "signIn" && (
        <div>코맷에 함께하게 되신 것을 환영합니다 :)</div>
      )}
    </>
  );
};

export default RegisterForm;
