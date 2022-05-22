import {
  RESET_AND_HIDE_MODAL_NOTE,
  SET_AND_SHOW_MODAL_NOTE,
} from "../notes/NotesActionTypes";
import {
  LOADING,
  LOADED,
  SET_LIGHT_THEME,
  SET_DARK_THEME,
  SET_CREATE_NOTE_CON_ACTIVE,
  RESET_CREATE_NOTE_CON_ACTIVE,
  RESET_BACKGROUND_PALETTE_ACTIVE,
  SET_BACKGROUND_PALETTE_ACTIVE,
  SET_SIDEBAR_EXPAND,
  RESET_SIDEBAR_EXPAND,
  SET_SETTINGS_PARAMETERS,
  RESET_SETTINGS_PARAMETERS,
  SET_MODAL_SETTINGS_ACTIVE,
  RESET_MODAL_SETTINGS_ACTIVE,
} from "./AppActionTypes";
const initialState = {
  loading: false,
  theme: "",
  isCreateNoteConActive: false,
  isBackgroundPaletteActive: false,
  isModalNoteActive: false,
  isSidebarExpanded: true,
  isModalSettingsActive: false,
  settingsParameters: {
    newItemsAtBottom: false,
    darkTheme: false,
  },
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
    case SET_AND_SHOW_MODAL_NOTE:
      return {
        ...state,
        isModalNoteActive: true,
        isCreateNoteConActive: false,
        isBackgroundPaletteActive: false,
      };
    case RESET_AND_HIDE_MODAL_NOTE:
      return {
        ...state,
        isModalNoteActive: false,
      };
    case SET_SIDEBAR_EXPAND:
      return {
        ...state,
        isSidebarExpanded: true,
      };
    case RESET_SIDEBAR_EXPAND:
      return {
        ...state,
        isSidebarExpanded: false,
      };
    case SET_SETTINGS_PARAMETERS:
      return {
        ...state,
        settingsParameters: {
          newItemsAtBottom: action.payload.newItemsAtBottom,
          darkTheme: action.payload.darkTheme,
        },
      };
    case RESET_SETTINGS_PARAMETERS:
      return {
        ...state,
        settingsParameters: {
          newItemsAtBottom: false,
          darkTheme: false,
        },
      };
    case SET_MODAL_SETTINGS_ACTIVE:
      return {
        ...state,
        isModalSettingsActive: true,
      };
    case RESET_MODAL_SETTINGS_ACTIVE:
      return {
        ...state,
        isModalSettingsActive: false,
      };
    default:
      return state;
  }
};

export default appReducer;
