import * as actionTypes from "./NotesActionTypes";

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
