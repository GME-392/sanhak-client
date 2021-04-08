export const GET_USER = "GET_USER";

export const getUserAction = (userData) => {
  return { type: GET_USER, payload: userData };
};
