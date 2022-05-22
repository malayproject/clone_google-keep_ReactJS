import * as actionTypes from "./NotesActionTypes";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { usersColRef } from "../../firebaseFolder/FirebaseApp";
import { createNotification } from "../../components/CreateNotification";

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

export const archiveNote = (noteId, userId) => {
  return async (dispatch) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`),
        {
          isTrashed: false,
          isArchived: true,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      dispatch(getAndSetActiveNotes(userId));
      createNotification("NOTE_ARCHIVED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const unArchiveNote = (noteId, userId) => {
  return async (dispatch) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`),
        {
          isTrashed: false,
          isArchived: false,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      dispatch(getAndSetArchivedNotes(userId));
      createNotification("NOTE_UNARCHIVED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const copyNote = (note, userId) => {
  return async (dispatch) => {
    try {
      const doc = await addDoc(collection(usersColRef, `/${userId}/notes`), {
        title: note.title,
        description: note.description,
        colorKey: note.colorKey,
        backImageKey: note.backImageKey,
        editedOn: new Date().toString(),
        createdOn: new Date().toString(),
        isPinned: note.isPinned,
        isArchived: note.isArchived,
        isTrashed: note.isTrashed,
      });
      note.isArchived
        ? dispatch(getAndSetArchivedNotes(userId))
        : dispatch(getAndSetActiveNotes(userId));
      // debugger;
      createNotification("NOTE_COPIED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const pinNote = (noteId, source, userId) => {
  return async (dispatch) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`),
        {
          isPinned: true,
          isArchived: false,
          editedOn: new Date().toString(),
        }
      );
      source === "notes"
        ? dispatch(getAndSetActiveNotes(userId))
        : dispatch(getAndSetArchivedNotes(userId));
      createNotification("NOTE_PINNED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const unPinNote = (noteId, userId) => {
  return async (dispatch) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`),
        {
          isPinned: false,
          isArchived: false,
          editedOn: new Date().toString(),
        }
      );
      dispatch(getAndSetActiveNotes(userId));
      createNotification("NOTE_UNPINNED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const restoreNote = (noteId, userId) => {
  return async (dispatch) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`),
        {
          isTrashed: false,
          isArchived: false,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      dispatch(getTrashedNotes(userId));
      createNotification("NOTE_RESTORED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteNote = (noteId, isArchived, userId) => {
  return async (dispatch) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`),
        {
          isTrashed: true,
          isArchived: false,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      isArchived
        ? dispatch(getAndSetArchivedNotes(userId))
        : dispatch(getAndSetActiveNotes(userId));
      // setTimeout(createNotification("NOTE_DELETED"), 3000);
      createNotification("NOTE_DELETED")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteForever = (noteId, source, userId) => {
  return async (dispatch) => {
    try {
      await deleteDoc(
        doc(collection(usersColRef, `/${userId}/notes`), `${noteId}`)
      );
      if (source === "notes") dispatch(getAndSetActiveNotes(userId));
      else if (source === "archive") dispatch(getAndSetArchivedNotes(userId));
      else dispatch(getTrashedNotes(userId));
      createNotification("NOTE_DELETED_FOREVER")();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setAndShowModalNote = (note, source) => {
  return {
    type: actionTypes.SET_AND_SHOW_MODAL_NOTE,
    payload: { data: note, source: source },
  };
};

export const resetAndHideModalNote = () => {
  return {
    type: actionTypes.RESET_AND_HIDE_MODAL_NOTE,
  };
};
