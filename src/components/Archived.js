import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import {
  getAndSetArchivedNotes,
  setAndShowModalNote,
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
import { backImages, colors } from "./BackgroundPaletteData";

const Archived = ({
  currUser,
  notes,
  theme,
  getAndSetArchivedNotes,
  isBackgroundPaletteActive,
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
  setAndShowModalNote,
}) => {
  const backgroundPalettesRef = useRef({});
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
          backImageKey: note.backImageKey,
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

  const handleNoteBackground = (e, noteId) => {
    console.log("inside handleNoteBackground");
    // console.dir(e.target);
    // console.log(backgroundPaletteRef.current);
    // console.log(backgroundPaletteRef.current?.contains?.(e.target));
    if (
      e.target === backgroundPalettesRef.current[`${noteId}`] ||
      backgroundPalettesRef.current[`${noteId}`]?.contains?.(e.target)
    ) {
      console.log(e.target);
      return;
    }
    isBackgroundPaletteActive
      ? resetIsBackgroundPaletteActive()
      : setIsBackgroundPaletteActive();
  };

  const handleNoteColKey = async (selectedColKey, noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          colorKey: selectedColKey,
          editedOn: new Date().toString(),
        }
      );
      getAndSetArchivedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNoteImgKey = async (selectedImgKey, noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          backImageKey: selectedImgKey,
          editedOn: new Date().toString(),
        }
      );
      getAndSetArchivedNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
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
            <div
              className="archivedNote note"
              key={archivedNote.id}
              style={{
                backgroundColor:
                  colors[archivedNote.colorKey][
                    `${archivedNote.colorKey}_${theme}`
                  ],
                backgroundImage:
                  "url(" +
                  backImages[archivedNote.backImageKey][
                    `${archivedNote.backImageKey}_${theme}`
                  ] +
                  ")",
                backgroundSize: "cover",
                backgroundPositionY: "bottom",
                border:
                  "1px solid " +
                  colors[archivedNote.colorKey][
                    `${archivedNote.colorKey}_${theme}`
                  ],
              }}
              onClick={(e) => {
                if (
                  e.target.classList.contains("iconCon") ||
                  e.target.parentElement.classList.contains("iconCon")
                ) {
                  console.log(e.target.className);
                  return;
                }

                setAndShowModalNote(archivedNote);
              }}
            >
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
                      e.stopPropagation();
                      handleNoteBackground(e, archivedNote.id);
                    }}
                  >
                    <IoIosColorPalette className="icon" />
                    <div className="info">Background options</div>
                    {isBackgroundPaletteActive && (
                      <div
                        className="backgroundPalette"
                        ref={(elem) =>
                          (backgroundPalettesRef.current[`${archivedNote.id}`] =
                            elem)
                        }
                      >
                        <BackgroundPalette
                          colKey={archivedNote.colorKey}
                          imgKey={archivedNote.backImageKey}
                          handleNoteColKey={handleNoteColKey}
                          handleNoteImgKey={handleNoteImgKey}
                          noteId={archivedNote.id}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={(e) => {
                      e.stopPropagation();
                      copyNote(archivedNote);
                    }}
                  >
                    <MdContentCopy className="icon" />
                    <div className="info">Copy</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={(e) => {
                      e.stopPropagation();
                      unArchiveNote(archivedNote.id);
                    }}
                  >
                    <MdUnarchive className="icon" />
                    <div className="info">Unarchive</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={(e) => {
                      e.stopPropagation();
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
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
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
    setAndShowModalNote: (note) => dispatch(setAndShowModalNote(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
