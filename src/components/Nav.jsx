import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import UserWelcome from "./UserWelcome/UserWelcome";
import { useSelector } from "react-redux";

const Nav = () => {
  const { pathname } = useLocation();
  const isSignedIn = useSelector((state) => state.AppState.isSignedIn);

  async function signOut() {
    await Auth.signOut();
  }

  return (
    <StyledNav>
      <h1>
        <Link id="logo" to="/">
          /* Comate */
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">코맷 소개</Link>
          <Line
            isSignedIn={isSignedIn}
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: pathname === "/" ? "50%" : "0%" }}
          />
        </li>
        <li>
          <Link to="/group">그룹 찾기</Link>
          <Line
            isSignedIn={isSignedIn}
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: pathname === "/group" ? "50%" : "0%" }}
          />
        </li>
        <li>
          <Link to="/rank">랭킹</Link>
          <Line
            isSignedIn={isSignedIn}
            transition={{ duration: 0.75 }}
            initial={{ width: "0%" }}
            animate={{ width: pathname === "/rank" ? "50%" : "0%" }}
          />
        </li>
        {isSignedIn ? (
          <UserWelcome />
        ) : (
          <>
            <li>
              <Link to="/login">로그인</Link>
              <Line
                isSignedIn={isSignedIn}
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: pathname === "/login" ? "50%" : "0%" }}
              />
            </li>
            <li>
              <Link to="/register">회원가입</Link>
              <Line
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: pathname === "/register" ? "50%" : "0%" }}
              />
            </li>
          </>
        )}
        {/* <button onClick={() => signOut()}>로그아웃</button> */}
        {/* <button className="Nav__signUp">회원 가입</button>
        <button className="Nav__signIn">로그인</button> */}
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  min-height: 10vh;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background: #282828;
  position: sticky;
  top: 0;
  z-index: 10;
  a {
    color: white;
    text-decoration: none;
  }
  ul {
    display: flex;
    list-style: none;
  }
  #logo {
    font-size: 1.5rem;
    font-weight: lighter;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5rem;
    position: relative;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 2rem 1rem;
    #logo {
      display: inline-block;
      margin: 1rem;
    }
    ul {
      padding: 1rem;
      justify-content: space-around;
      width: 100%;
      li {
        padding: 0;
      }
    }
  }
`;

const Line = styled(motion.div)`
  height: 0.3rem;
  background: #40368a;
  width: 0%;
  position: absolute;
  top: ${(props) => (props.isSignedIn ? "100%" : "160%")};
  left: 25%;
  @media (max-width: 900px) {
    left: 0%;
  }
`;

export default Nav;
