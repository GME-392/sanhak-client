import React, { useRef } from "react";
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
  const imgRef = useRef(null);

  async function signOut() {
    await Auth.signOut();
    dispatch(onLoginFail());
  }

  return (
    <li>
      <div className="user-welcome" onClick={() => history.push(`/user/${activeUser}`)}>
        <span>
          <img
            ref={imgRef}
            src={`https://sanhak-image-server.s3.ap-northeast-2.amazonaws.com/${activeUser}.jpg`}
            onError={() => {
              return (imgRef.current.src =
                "https://sanhak-image-server.s3.ap-northeast-2.amazonaws.com/profile.jpeg");
            }}
            width={32}
            style={{ borderRadius: "12px" }}
          />
          {activeUser}님, 환영합니다.
        </span>
        <button
          onClick={() => {
            signOut();
            history.push(`/user/${activeUser}`);
          }}
        >
          로그아웃
        </button>
      </div>
    </li>
  );
};

export default UserWelcome;
