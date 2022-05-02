import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import { setActiveNotes } from "../redux/notes/NotesActions";

const Notes = ({ notes, currUser, setActiveNotes }) => {
  useEffect(() => {
    const getActiveNotes = async () => {
      const userNotesColRef = collection(usersColRef, `/${currUser.uid}/notes`);
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
      pinnedNotesSnap.forEach((doc) => pinnedNotes.push(doc.data()));
      unPinnedNotesSnap.forEach((doc) => unPinnedNotes.push(doc.data()));
      setActiveNotes({
        pinned: pinnedNotes,
        unPinned: unPinnedNotes,
      });
    };
    try {
      getActiveNotes();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return <div className="notesCon">Notes</div>;
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    currUser: state.auth.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveNotes: (activeNotesData) =>
      dispatch(setActiveNotes(activeNotesData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
