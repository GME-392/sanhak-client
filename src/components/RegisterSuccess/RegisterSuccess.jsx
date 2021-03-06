import React from "react";
import "./RegisterSuccess.scss";
import { Link } from "react-router-dom";

const RegisterSuccess = () => {
  return (
    <div className="RegisterSuccess__container">
      <div>π« μ½λ§·μ ν¨κ»νκ² λμ  κ²μ νμν©λλ€!</div>
      <div>λ λ§μ μ¬λλ€κ³Ό ν¨κ», λ λ§μ λ¬Έμ λ₯Ό νμ΄ λ³΄μΈμ! π―</div>
      <div className="RegisterSuccess__btn__container">
        <button className="RegisterSuccess__btn RegisterSuccess__btn--home">
          <Link to="/">νμΌλ‘</Link>
        </button>
        <button className="RegisterSuccess__btn RegisterSuccess__btn--login">
          <Link to="/login">λ‘κ·ΈμΈ</Link>
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
