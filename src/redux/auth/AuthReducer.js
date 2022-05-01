import {
  AUTH_STATE_SET,
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGOUT_ERROR,
  GOOGLE_LOGOUT_SUCCESS,
} from "./AuthActionTypes";

const initialState = {
  isAuthenticated: false,
  currUser: null,
  authError: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        currUser: action.payload,
        isAuthenticated: true,
        authError: "",
      };
    case GOOGLE_LOGIN_ERROR:
      return {
        ...state,
        currUser: null,
        isAuthenticated: false,
        authError: action.payload,
      };
    case GOOGLE_LOGOUT_SUCCESS:
      return {
        ...state,
        currUser: null,
        isAuthenticated: false,
        authError: "",
      };
    case GOOGLE_LOGOUT_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case AUTH_STATE_SET:
      return {
        ...state,
        currUser: action.payload,
        isAuthenticated: action.payload ? true : false,
      };
    default:
      return state;
  }
};

export default authReducer;
