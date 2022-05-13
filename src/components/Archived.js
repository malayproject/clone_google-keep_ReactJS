import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import {
  getAndSetArchivedNotes,
  setArchivedNotes,
} from "../redux/notes/NotesActions";
import { IoIosColorPalette } from "react-icons/io";
import { MdUnarchive, MdDelete, MdContentCopy } from "react-icons/md";
import { BsPin, BsPinFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
} from "../redux/app/AppActions";
import BackgroundPalette from "./BackgroundPalette";

const Archived = ({
  currUser,
  notes,
  theme,
  getAndSetArchivedNotes,
  isBackgroundPaletteActive,
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
}) => {
  const deleteNote = async (noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          isTrashed: true,
          isArchived: false,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      getAndSetArchivedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const copyNote = async (note) => {
    try {
      const doc = await addDoc(
        collection(usersColRef, `/${currUser.uid}/notes`),
        {
          title: note.title,
          description: note.description,
          colorKey: note.colorKey,
          editedOn: new Date().toString(),
          createdOn: new Date().toString(),
          isPinned: note.isPinned,
          isArchived: note.isArchived,
          isTrashed: note.isTrashed,
        }
      );
      getAndSetArchivedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const unArchiveNote = async (noteId) => {
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
      getAndSetArchivedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNoteBackground = (e) => {
    console.log("inside handleNoteBackground");
    console.dir(e.target);
    if (
      e.target.className === "backgroundColorCon" ||
      e.target.className === "backgroundImageCon" ||
      e.target.parentElement.className === "backgroundColorCon" ||
      e.target.parentElement.className === "backgroundImageCon"
    ) {
      console.log(e.target);
      return;
    }
    isBackgroundPaletteActive
      ? resetIsBackgroundPaletteActive()
      : setIsBackgroundPaletteActive();
  };

  useEffect(() => {
    try {
      getAndSetArchivedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className={`archivedCon ${theme}`}>
      <div className="archivedBody">
        {notes.archivedNotes?.map((archivedNote) => {
          return (
            <div className="archivedNote note" key={archivedNote.id}>
              <div className="header">
                <div className="title">{archivedNote.title}</div>
                <div className={`iconCon ${theme} hoverable`}>
                  <BsPin className="icon" />
                  <div className="info">Pin</div>
                </div>
              </div>
              <div className="description">{archivedNote.description}</div>
              <div className="actions">
                <div className="left">
                  <div
                    className={`iconCon ${theme} palette hoverable`}
                    onClick={(e) => {
                      handleNoteBackground(e);
                    }}
                  >
                    <IoIosColorPalette className="icon" />
                    <div className="info">Background options</div>
                    {isBackgroundPaletteActive && <BackgroundPalette />}
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={() => {
                      copyNote(archivedNote);
                    }}
                  >
                    <MdContentCopy className="icon" />
                    <div className="info">Copy</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={() => {
                      unArchiveNote(archivedNote.id);
                    }}
                  >
                    <MdUnarchive className="icon" />
                    <div className="info">Unarchive</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={() => {
                      deleteNote(archivedNote.id);
                    }}
                  >
                    <MdDelete className="icon" />
                    <div className="info">Delete</div>
                  </div>
                </div>
                <div className="right">
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={() => {}}
                  >
                    <BiDotsVerticalRounded className="icon" />
                    <div className="info">More</div>
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
    isBackgroundPaletteActive: state.app.isBackgroundPaletteActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAndSetArchivedNotes: (userId) =>
      dispatch(getAndSetArchivedNotes(userId)),
    setIsBackgroundPaletteActive: () =>
      dispatch(setIsBackgroundPaletteActive()),
    resetIsBackgroundPaletteActive: () =>
      dispatch(resetIsBackgroundPaletteActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
