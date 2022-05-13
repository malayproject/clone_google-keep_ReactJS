import {
  LOADING,
  LOADED,
  SET_LIGHT_THEME,
  SET_DARK_THEME,
  SET_CREATE_NOTE_CON_ACTIVE,
  RESET_CREATE_NOTE_CON_ACTIVE,
  RESET_BACKGROUND_PALETTE_ACTIVE,
  SET_BACKGROUND_PALETTE_ACTIVE,
} from "./AppActionTypes";
const initialState = {
  loading: false,
  theme: "",
  isCreateNoteConActive: false,
  isBackgroundPaletteActive: false,
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
    case SET_CREATE_NOTE_CON_ACTIVE:
      return {
        ...state,
        isCreateNoteConActive: true,
      };
    case RESET_CREATE_NOTE_CON_ACTIVE:
      return {
        ...state,
        isCreateNoteConActive: false,
      };
    case SET_BACKGROUND_PALETTE_ACTIVE:
      return {
        ...state,
        isBackgroundPaletteActive: true,
      };
    case RESET_BACKGROUND_PALETTE_ACTIVE:
      return {
        ...state,
        isBackgroundPaletteActive: false,
      };
    default:
      return state;
  }
};

export default appReducer;
