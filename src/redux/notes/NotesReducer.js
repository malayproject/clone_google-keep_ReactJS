import * as actionTypes from "./NotesActionTypes";

const initialState = {
  notes: {},
  modalNote: null,
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
    case actionTypes.SET_AND_SHOW_MODAL_NOTE:
      return {
        ...state,
        modalNote: action.payload,
      };
    case actionTypes.RESET_AND_HIDE_MODAL_NOTE:
      return {
        ...state,
        modalNote: null,
      };
    default:
      return state;
  }
};

export default notesReducer;
