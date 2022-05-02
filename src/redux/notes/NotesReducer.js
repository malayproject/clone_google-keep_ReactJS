import * as actionTypes from "./NotesActionTypes";

const initialState = {
  notes: {},
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_NOTES:
      return {
        ...state,
        notes: {
          ...state.notes,
          activeNotes: {
            pinned: action.payload.pinned,
            unPinned: action.payload.unPinned,
          },
        },
      };
    case actionTypes.SET_ARCHIVED_NOTES:
      return {
        ...state,
        notes: {
          ...state.notes,
          archivedNotes: action.payload,
        },
      };
    case actionTypes.SET_TRASHED_NOTES:
      return {
        ...state,
        notes: {
          ...state.notes,
          trashedNotes: action.payload,
        },
      };
    default:
      return state;
  }
};

export default notesReducer;
