import { SET_AND_SHOW_MODAL_NOTE } from "../notes/NotesActionTypes";
import {
  LOADING,
  LOADED,
  SET_DARK_THEME,
  SET_LIGHT_THEME,
  SET_CREATE_NOTE_CON_ACTIVE,
  RESET_CREATE_NOTE_CON_ACTIVE,
  SET_BACKGROUND_PALETTE_ACTIVE,
  RESET_BACKGROUND_PALETTE_ACTIVE,
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

export const setIsCreateNoteConActive = () => {
  return {
    type: SET_CREATE_NOTE_CON_ACTIVE,
  };
};

export const resetIsCreateNoteConActive = () => {
  return {
    type: RESET_CREATE_NOTE_CON_ACTIVE,
  };
};

export const setIsBackgroundPaletteActive = () => {
  return {
    type: SET_BACKGROUND_PALETTE_ACTIVE,
  };
};

export const resetIsBackgroundPaletteActive = () => {
  return {
    type: RESET_BACKGROUND_PALETTE_ACTIVE,
  };
};
