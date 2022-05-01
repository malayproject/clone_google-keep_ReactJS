import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGOUT_SUCCESS,
  GOOGLE_LOGOUT_ERROR,
  AUTH_STATE_SET,
} from "./AuthActionTypes";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../firebaseFolder/FirebaseApp";
import { loaded, loading } from "../app/AppActions";

export const googleLoginSuccess = (user) => {
  return {
    type: GOOGLE_LOGIN_SUCCESS,
    payload: user,
  };
};

export const googleLoginError = (errorMsg) => {
  return {
    type: GOOGLE_LOGIN_ERROR,
    payload: errorMsg,
  };
};

export const googleLogoutSuccess = () => {
  return {
    type: GOOGLE_LOGOUT_SUCCESS,
  };
};

export const googleLogoutError = (errorMsg) => {
  return {
    type: GOOGLE_LOGOUT_ERROR,
    payload: errorMsg,
  };
};

export const setAuthState = (authInfo) => {
  return {
    type: AUTH_STATE_SET,
    payload: authInfo,
  };
};

const authenticate = () => {
  return (dispatch) => {
    dispatch(loading());
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
        dispatch(googleLoginSuccess(res.user));
        dispatch(loaded());
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(googleLoginError(error.message));
        dispatch(loaded());
      });
  };
};

export const logout = () => {
  console.log("in logout");
  return (dispatch) => {
    dispatch(loading());
    signOut(auth)
      .then(() => {
        dispatch(googleLogoutSuccess());
        dispatch(loaded());
      })
      .catch((error) => {
        dispatch(googleLogoutError(error.message));
        dispatch(loaded());
      });
  };
};

export default authenticate;
