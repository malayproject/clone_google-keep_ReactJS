import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import { getTrashedNotes } from "../redux/notes/NotesActions";
import { MdRestoreFromTrash, MdDeleteForever } from "react-icons/md";
import { backImages, colors } from "./BackgroundPaletteData";

const Trashed = ({ currUser, notes, theme, getTrashedNotes }) => {
  const deleteForever = async (noteId) => {
    await deleteDoc(
      doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`)
    );
    try {
      getTrashedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const restoreNote = async (noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          isTrashed: false,
          isArchived: false,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      getTrashedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      getTrashedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className={`trashedCon ${theme}`}>
      <div className="trashedHeader">
        <div className="header-note">
          Notes in Trash are permanently deleted after 30 days.
        </div>
        <button>Empty Trash</button>
      </div>
      <div className="trashedBody">
        {notes.trashedNotes?.map((trashedNote) => {
          return (
            <div
              className="trashedNote note"
              key={trashedNote.id}
              style={{
                backgroundColor:
                  colors[trashedNote.colorKey][
                    `${trashedNote.colorKey}_${theme}`
                  ],
                backgroundImage:
                  "url(" +
                  backImages[trashedNote.backImageKey][
                    `${trashedNote.backImageKey}_${theme}`
                  ] +
                  ")",
                backgroundSize: "cover",
                backgroundPositionY: "bottom",
                border:
                  "1px solid " +
                  colors[trashedNote.colorKey][
                    `${trashedNote.colorKey}_${theme}`
                  ],
              }}
            >
              <div className="header">
                <div className="title">{trashedNote.title}</div>
              </div>
              <div className="description">{trashedNote.description}</div>
              <div className="actions">
                <div className="left">
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={() => {
                      restoreNote(trashedNote.id);
                    }}
                  >
                    <MdRestoreFromTrash className="icon" />
                    <div className="info">Restore</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={() => {
                      deleteForever(trashedNote.id);
                    }}
                  >
                    <MdDeleteForever className="icon" />
                    <div className="info">Delete forever</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUser: state.auth.currUser,
    notes: state.notes.notes,
    theme: state.app.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrashedNotes: (userId) => dispatch(getTrashedNotes(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trashed);
