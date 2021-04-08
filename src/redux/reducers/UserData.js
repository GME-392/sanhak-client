import { GET_USER } from "../actions/userActions";

const initialState = {
  username: "",
  bojname: "",
  password: "",
  groups: [],
  email: "",
  level: "",
  problem_solved: [],
  created_at: "",
};

export const UserData = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    default:
      return state;
  }
};
