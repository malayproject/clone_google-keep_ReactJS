import * as actionTypes from "./NotesActionTypes";

export const setActiveNotes = (activeNotes) => {
  return {
    type: actionTypes.SET_ACTIVE_NOTES,
    payload: activeNotes,
  };
};

export const setArchivedNotes = (archivedNotes) => {
  return {
    type: actionTypes.SET_ARCHIVED_NOTES,
    payload: archivedNotes,
  };
};

export const setTrashedNotes = (trashedNotes) => {
  return {
    type: actionTypes.SET_TRASHED_NOTES,
    payload: trashedNotes,
  };
};
