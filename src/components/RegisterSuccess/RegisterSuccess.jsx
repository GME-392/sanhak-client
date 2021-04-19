import React from "react";
import "./RegisterSuccess.scss";
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div className="RegisterSuccess__container">
      <div>💫 코맷에 함께하게 되신 것을 환영합니다!</div>
      <div>더 많은 사람들과 함께, 더 많은 문제를 풀어 보세요! 💯</div>
      <div className="RegisterSuccess__btn__container">
        <button className="RegisterSuccess__btn RegisterSuccess__btn--home">
          <Link to="/">홈으로</Link>
        </button>
        <button className="RegisterSuccess__btn RegisterSuccess__btn--login">
          <Link to="/login">로그인</Link>
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
