import {
  LOADING,
  LOADED,
  SET_LIGHT_THEME,
  SET_DARK_THEME,
} from "./AppActionTypes";
const initialState = {
  loading: false,
  theme: "",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_LIGHT_THEME:
      return {
        ...state,
        theme: "",
      };
    case SET_DARK_THEME:
      return {
        ...state,
        theme: "dark",
      };
    default:
      return state;
  }
};

export default appReducer;
