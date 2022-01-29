import {
  API_CALL_STARTS,
  API_CALL_SUCCESSFUL,
  API_CALL_FAILED,
  API_CALL_END,
  LOGOUT,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
} from "./userAction";

const initialValue = {
  isLoading: false,
  data: JSON.parse(localStorage.getItem("userInfo")),
  error: "",
  token: localStorage.getItem("token"),
};
const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case API_CALL_STARTS:
      return {
        ...state,
        isLoading: true,
      };
    case API_CALL_SUCCESSFUL:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const token = localStorage.getItem("token");
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        token: token,
        error: "",
      };
    case API_CALL_FAILED:
      return {
        ...state,
        isLoading: false,
        data: "",
        token: "",
        error: action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        data: "",
        error: "",
        token: "",
      };
    case API_CALL_END:
      return {
        ...state,
        isLoading: false,
        data: "",
        error: "",
        token: "",
      };
    case UPDATE_START:
      return {
        ...state,
        isLoading: true,
        data: state.data,
        error: "",
        token: state.token,
      };
    case UPDATE_SUCCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: "",
        token: state.token,
      };
    case UPDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        data: state.data,
        error: action.payload,
        token: state.token,
      };
    default:
      return state;
  }
};

export default reducer;
