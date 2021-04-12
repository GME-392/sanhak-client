import React from "react";
import profile from "../../img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "aws-amplify";
import "./UserWelcome.scss";
import { onLoginFail } from "../../redux/actions/authActions";
import { Link, useHistory } from "react-router-dom";

const UserWelcome = () => {
  const activeUser = useSelector((state) => state.AppState.activeUser);
  const dispatch = useDispatch();
  const history = useHistory();

  async function signOut() {
    await Auth.signOut();
    dispatch(onLoginFail());
  }

  return (
    <li>
      <div
        className="user-welcome"
        onClick={() => history.push(`/user/${activeUser}`)}
      >
        <span>
          <img src={profile} />
          {activeUser}님, 환영합니다.
        </span>
        <button onClick={signOut}>로그아웃</button>
      </div>
    </li>
  );
};

export default UserWelcome;
