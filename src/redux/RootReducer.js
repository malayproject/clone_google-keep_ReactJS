import { combineReducers } from "redux";
import appReducer from "./app/AppReducer";
import authReducer from "./auth/AuthReducer";
import notesReducer from "./notes/NotesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  notes: notesReducer,
});

export default rootReducer;
