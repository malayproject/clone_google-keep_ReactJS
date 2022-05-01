import * as actionTypes from "./NotesActionTypes";

export const getNotes = (notes) => {
  return {
    type: actionTypes.GET_NOTES,
    payload: notes,
  };
};

// const
