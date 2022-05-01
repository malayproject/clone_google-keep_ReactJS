import {
  LOADING,
  LOADED,
  SET_DARK_THEME,
  SET_LIGHT_THEME,
} from "./AppActionTypes";

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const loaded = () => {
  return {
    type: LOADED,
  };
};

export const setDarkTheme = () => {
  return {
    type: SET_DARK_THEME,
  };
};

export const setLightTheme = () => {
  return {
    type: SET_LIGHT_THEME,
  };
};
