import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import { setArchivedNotes } from "../redux/notes/NotesActions";

const Archived = ({ currUser, notes, setArchivedNotes }) => {
  useEffect(() => {
    const getArchivedNotes = async () => {
      const userNotesColRef = collection(usersColRef, `/${currUser.uid}/notes`);
      const archivedNotesQuerry = query(
        userNotesColRef,
        where("isArchived", "==", true)
      );
      const archivedNotesSnap = await getDocs(archivedNotesQuerry);
      let archivedNotes = [];
      archivedNotesSnap.forEach((doc) => archivedNotes.push(doc.data()));
      setArchivedNotes(archivedNotes);
    };
    try {
      getArchivedNotes();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return <div className="ArchivedCon">Archived</div>;
};

const mapStateToProps = (state) => {
  return {
    currUser: state.auth.currUser,
    notes: state.notes.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setArchivedNotes: (archivedNotes) =>
      dispatch(setArchivedNotes(archivedNotes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
