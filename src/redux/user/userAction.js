export const API_CALL_STARTS = "API_CALL_STARTS";
export const API_CALL_SUCCESSFUL = "API_CALL_SUCCESSFUL";
export const API_CALL_FAILED = "API_CALL_FAILED";
export const API_CALL_END = "API_CALL_END";
export const LOGOUT = "LOGOUT";
export const UPDATE_START = "UPDATE_START";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

export const api_call_starts = () => {
  return {
    type: "API_CALL_STARTS",
  };
};
export const api_call_successful = (user) => {
  return {
    type: "API_CALL_SUCCESSFUL",
    payload: user,
  };
};
export const api_call_failed = (error) => {
  return {
    type: "API_CALL_FAILED",
    payload: error,
  };
};
export const api_call_end = () => {
  return {
    type: "API_CALL_END",
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const userUpdateStart = () => {
  return {
    type: "UPDATE_START",
  };
};
export const userUpdateSuccess = (user) => {
  return {
    type: "UPDATE_SUCCESS",
    payload: user,
  };
};
export const userUpdateFailure = (error) => {
  return {
    type: "UPDATE_FAILED",
    payload: error,
  };
};
