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
  unArchiveNote,
  deleteNote,
  copyNote,
  pinNote,
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
  isNewestModeActive,
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
  setAndShowModalNote,
  unArchiveNote,
  deleteNote,
  copyNote,
  pinNote,
}) => {
  const backgroundPalettesRef = useRef({});

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
      getAndSetArchivedNotes(currUser.uid, isNewestModeActive);
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
      getAndSetArchivedNotes(currUser.uid, isNewestModeActive);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("notes useEffect on isNewestModeActive");
    getAndSetArchivedNotes(currUser.uid, isNewestModeActive);
  }, [isNewestModeActive]);

  useEffect(() => {
    try {
      getAndSetArchivedNotes(currUser.uid, isNewestModeActive);
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
                // if (
                //   e.target.classList.contains("iconCon") ||
                //   e.target.parentElement.classList.contains("iconCon")
                // ) {
                //   console.log(e.target.className);
                //   return;
                // }
                setAndShowModalNote(archivedNote, "archive");
              }}
            >
              <div className="header">
                <div className="title">{archivedNote.title}</div>
                <div
                  className={`iconCon ${theme} hoverable`}
                  onClick={(e) => {
                    e.stopPropagation();
                    pinNote(
                      archivedNote.id,
                      "archive",
                      currUser.uid,
                      isNewestModeActive
                    );
                  }}
                >
                  <BsPin className="icon" />
                  <div className="info">Pin</div>
                </div>
              </div>
              <div className="description">
                {archivedNote.description.length > 100
                  ? archivedNote.description.slice(0, 99) + "..."
                  : archivedNote.description}
              </div>
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
                      copyNote(archivedNote, currUser.uid, isNewestModeActive);
                    }}
                  >
                    <MdContentCopy className="icon" />
                    <div className="info">Copy</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={(e) => {
                      e.stopPropagation();
                      unArchiveNote(
                        archivedNote.id,
                        currUser.uid,
                        isNewestModeActive
                      );
                    }}
                  >
                    <MdUnarchive className="icon" />
                    <div className="info">Unarchive</div>
                  </div>
                  <div
                    className={`iconCon ${theme} hoverable`}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(
                        archivedNote.id,
                        archivedNote.isArchived,
                        currUser.uid,
                        isNewestModeActive
                      );
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
    theme: state.app.settingsParameters.darkTheme ? "dark" : "",
    isBackgroundPaletteActive: state.app.isBackgroundPaletteActive,
    isNewestModeActive: state.app.settingsParameters.newItemsAtBottom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAndSetArchivedNotes: (userId, isNewestModeActive) =>
      dispatch(getAndSetArchivedNotes(userId, isNewestModeActive)),
    setIsBackgroundPaletteActive: () =>
      dispatch(setIsBackgroundPaletteActive()),
    resetIsBackgroundPaletteActive: () =>
      dispatch(resetIsBackgroundPaletteActive()),
    setAndShowModalNote: (note, source) =>
      dispatch(setAndShowModalNote(note, source)),
    deleteNote: (noteId, isArchived, userId, isNewestModeActive) => {
      dispatch(deleteNote(noteId, isArchived, userId, isNewestModeActive));
    },
    copyNote: (note, userId, isNewestModeActive) =>
      dispatch(copyNote(note, userId, isNewestModeActive)),
    unArchiveNote: (noteId, userId, isNewestModeActive) =>
      dispatch(unArchiveNote(noteId, userId, isNewestModeActive)),
    pinNote: (noteId, source, userId, isNewestModeActive) =>
      dispatch(pinNote(noteId, source, userId, isNewestModeActive)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
