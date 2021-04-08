export const CHECK_LOGIN = "CHECK_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const checkSignedIn = async (username) => {
  if (username !== null) {
    return { type: CHECK_LOGIN, payload: false };
  }
  return {
    type: CHECK_LOGIN,
    payload: true,
  };
};

export const onLoginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: { username, isSignedIn: true },
});

export const onLoginFail = () => ({
  type: LOGIN_FAIL,
  payload: { isSignedIn: false },
});

export const onLogout = () => ({ type: LOGOUT });
