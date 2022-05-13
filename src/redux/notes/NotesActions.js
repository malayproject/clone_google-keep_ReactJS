import * as actionTypes from "./NotesActionTypes";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { usersColRef } from "../../firebaseFolder/FirebaseApp";

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

export const getAndSetActiveNotes = (userId) => {
  return async (dispatch) => {
    try {
      const userNotesColRef = collection(usersColRef, `/${userId}/notes`);
      const pinnedNotesQuerry = query(
        userNotesColRef,
        where("isPinned", "==", true),
        where("isArchived", "==", false),
        where("isTrashed", "==", false)
      );
      const unPinnedNotesQuerry = query(
        userNotesColRef,
        where("isPinned", "==", false),
        where("isArchived", "==", false),
        where("isTrashed", "==", false)
      );
      const pinnedNotesSnap = await getDocs(pinnedNotesQuerry);
      const unPinnedNotesSnap = await getDocs(unPinnedNotesQuerry);
      let pinnedNotes = [];
      let unPinnedNotes = [];
      pinnedNotesSnap.forEach((doc) =>
        pinnedNotes.push({ ...doc.data(), id: doc.id })
      );
      unPinnedNotesSnap.forEach((doc) =>
        unPinnedNotes.push({ ...doc.data(), id: doc.id })
      );
      dispatch(
        setActiveNotes({
          pinned: pinnedNotes,
          unPinned: unPinnedNotes,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAndSetArchivedNotes = (userId) => {
  return async (dispatch) => {
    const userNotesColRef = collection(usersColRef, `/${userId}/notes`);
    const archivedNotesQuerry = query(
      userNotesColRef,
      where("isArchived", "==", true)
    );
    const archivedNotesSnap = await getDocs(archivedNotesQuerry);
    let archivedNotes = [];
    archivedNotesSnap.forEach((doc) => {
      archivedNotes.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setArchivedNotes(archivedNotes));
  };
};

export const getTrashedNotes = (userId) => {
  return async (dispatch) => {
    const userNotesColRef = collection(usersColRef, `/${userId}/notes`);
    const trashedNotesQuerry = query(
      userNotesColRef,
      where("isTrashed", "==", true)
    );
    const trashedNotesSnap = await getDocs(trashedNotesQuerry);
    let trashedNotes = [];
    trashedNotesSnap.forEach((doc) =>
      trashedNotes.push({ ...doc.data(), id: doc.id })
    );
    dispatch(setTrashedNotes(trashedNotes));
  };
};
