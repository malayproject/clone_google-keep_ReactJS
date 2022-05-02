import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import { setTrashedNotes } from "../redux/notes/NotesActions";

const Trashed = ({ currUser, notes, setTrashedNotes }) => {
  useEffect(() => {
    const getTrashedNotes = async () => {
      const userNotesColRef = collection(usersColRef, `/${currUser.uid}/notes`);
      const trashedNotesQuerry = query(
        userNotesColRef,
        where("isTrashed", "==", true)
      );
      const trashedNotesSnap = await getDocs(trashedNotesQuerry);
      let trashedNotes = [];
      trashedNotesSnap.forEach((doc) => trashedNotes.push(doc.data()));
      setTrashedNotes(trashedNotes);
    };
    try {
      getTrashedNotes();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return <div className="trashedCon">Trashed</div>;
};

const mapStateToProps = (state) => {
  return {
    currUser: state.auth.currUser,
    notes: state.notes.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTrashedNotes: (trashedNotes) => dispatch(setTrashedNotes(trashedNotes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trashed);
