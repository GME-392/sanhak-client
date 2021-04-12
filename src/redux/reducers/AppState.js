import { LOGIN_SUCCESS, CHECK_LOGIN, LOGIN_FAIL } from "../actions/authActions";

const initialState = {
  isSignedIn: false,
  activeUser: null,
};

export const AppState = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN:
      return { ...state, isSignedIn: action.payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        activeUser: action.payload.username,
      };
    case LOGIN_FAIL:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
