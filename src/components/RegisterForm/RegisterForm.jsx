import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [bojName, setBojName] = useState(null);

  axios.post("");

  return (
    <Form className="Register-form">
      <Form.Group controlId="id">
        <Form.Label>아이디</Form.Label>
        <Form.Control
          type="text"
          placeholder="아이디를 입력해 주세요"
          onChange={(e) => {
            setUserName(e.target.value);
            console.log(userName);
          }}
        />
        <Form.Text className="text-muted">
          아이디는 로그인에 사용되며, 다른 사용자들에게 공개됩니다.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="bojId">
        <Form.Label>백준 온라인 저지 아이디</Form.Label>
        <Form.Control
          type="text"
          placeholder="백준 온라인 저지 아이디를 입력해 주세요"
          onChange={(e) => {
            setBojName(e.target.value);
            console.log(userName);
          }}
        />
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
        <Form.Control type="email" placeholder="이메일을 입력해 주세요" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="text" placeholder="비밀번호를 입력해 주세요" />
        <Form.Text className="text-muted">
          비밀번호는 8 ~ 16자 사이의 영어 + 숫자 조합으로 만들어 주세요.
        </Form.Text>
      </Form.Group>{" "}
      <Form.Group controlId="confirmPassword">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
      </Form.Group>
      <Button className="Register-button" type="submit">
        회원가입
      </Button>
    </Form>
  );
};

export default RegisterForm;
