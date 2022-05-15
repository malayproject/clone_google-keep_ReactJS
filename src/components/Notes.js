import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import {
  getAndSetActiveNotes,
  setActiveNotes,
  setArchivedNotes,
} from "../redux/notes/NotesActions";
import { BsPin, BsPinFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { MdArchive, MdDelete, MdContentCopy } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CreateOrEditNote from "./CreateOrEditNote";
import {
  setIsCreateNoteConActive,
  resetIsCreateNoteConActive,
  resetIsBackgroundPaletteActive,
  setIsBackgroundPaletteActive,
} from "../redux/app/AppActions";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import BackgroundPalette from "./BackgroundPalette";
import { backImages, colors } from "./BackgroundPaletteData";

const Notes = ({
  notes,
  currUser,
  theme,
  getAndSetActiveNotes,
  isCreateNoteConActive,
  isBackgroundPaletteActive,
  setIsCreateNoteConActive,
  resetIsCreateNoteConActive,
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
}) => {
  const backgroundPalettesRef = useRef({});

  const deleteForever = async (noteId) => {
    try {
      await deleteDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`)
      );

      getAndSetActiveNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const unPinNote = async (noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      getAndSetActiveNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const pinNote = async (noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          isPinned: true,
          editedOn: new Date().toString(),
        }
      );
      getAndSetActiveNotes(currUser.uid);
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
      getAndSetActiveNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const archiveNote = async (noteId) => {
    try {
      await updateDoc(
        doc(collection(usersColRef, `/${currUser.uid}/notes`), `${noteId}`),
        {
          isTrashed: false,
          isArchived: true,
          isPinned: false,
          editedOn: new Date().toString(),
        }
      );
      getAndSetActiveNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

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
      getAndSetActiveNotes(currUser.uid);
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
      getAndSetActiveNotes(currUser.uid);
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
      getAndSetActiveNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    resetIsCreateNoteConActive();
    console.log("notes useEffect");
    getAndSetActiveNotes(currUser.uid);
  }, []);

  return (
    <div className={`notesCon ${theme}`}>
      <div className="createNoteCon">
        {isCreateNoteConActive ? (
          <CreateOrEditNote />
        ) : (
          <input
            type="text"
            className="minimized"
            placeholder="Take a note..."
            onClick={setIsCreateNoteConActive}
          />
        )}
      </div>
      <div className="notesBody">
        <div className={`pinnedNotesCon ${theme}`}>
          <div className="pinnedNotesHeader">PINNED</div>
          <div className="pinnedNotesBody">
            {notes.activeNotes?.pinned.map((pinnedNote) => {
              return (
                <div
                  className="pinnedNote note"
                  key={pinnedNote.id}
                  style={{
                    backgroundColor:
                      colors[pinnedNote.colorKey][
                        `${pinnedNote.colorKey}_${theme}`
                      ],
                    backgroundImage:
                      "url(" +
                      backImages[pinnedNote.backImageKey][
                        `${pinnedNote.backImageKey}_${theme}`
                      ] +
                      ")",
                    backgroundSize: "cover",
                    backgroundPositionY: "bottom",
                    border:
                      "1px solid " +
                      colors[pinnedNote.colorKey][
                        `${pinnedNote.colorKey}_${theme}`
                      ],
                  }}
                >
                  <div className="header">
                    <div className="title">{pinnedNote.title}</div>
                    <div
                      className={`iconCon ${theme} hoverable`}
                      onClick={() => unPinNote(pinnedNote.id)}
                    >
                      <BsPinFill className="icon" />
                      <div className="info">Unpin</div>
                    </div>
                  </div>
                  <div className="description">{pinnedNote.description}</div>
                  <div className="actions">
                    <div className="left">
                      <div
                        className={`iconCon ${theme} palette hoverable`}
                        onClick={(e) => {
                          handleNoteBackground(e, pinnedNote.id);
                        }}
                      >
                        <IoIosColorPalette className="icon" />
                        <div className="info">Background options</div>
                        {isBackgroundPaletteActive && (
                          <div
                            className="backgroundPalette"
                            ref={(elem) =>
                              (backgroundPalettesRef.current[
                                `${pinnedNote.id}`
                              ] = elem)
                            }
                          >
                            <BackgroundPalette
                              colKey={pinnedNote.colorKey}
                              imgKey={pinnedNote.backImageKey}
                              handleNoteColKey={handleNoteColKey}
                              handleNoteImgKey={handleNoteImgKey}
                              noteId={pinnedNote.id}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className={`iconCon ${theme} hoverable`}
                        onClick={() => {
                          copyNote(pinnedNote);
                        }}
                      >
                        <MdContentCopy className="icon" />
                        <div className="info">Copy</div>
                      </div>
                      <div
                        className={`iconCon ${theme} hoverable`}
                        onClick={() => archiveNote(pinnedNote.id)}
                      >
                        <MdArchive className="icon" />
                        <div className="info">Archive</div>
                      </div>
                      <div
                        className={`iconCon ${theme} hoverable`}
                        onClick={() => deleteNote(pinnedNote.id)}
                      >
                        <MdDelete className="icon" />
                        <div className="info">delete</div>
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
        <div className={`unPinnedNotesCon ${theme}`}>
          <div className="unPinnedNotesHeader">OTHERS</div>
          <div className="unPinnedNotesBody">
            {notes.activeNotes?.unPinned.map((unPinnedNote) => {
              return (
                <div
                  className="unPinnedNote note"
                  key={unPinnedNote.id}
                  style={{
                    backgroundColor:
                      colors[unPinnedNote.colorKey][
                        `${unPinnedNote.colorKey}_${theme}`
                      ],
                    backgroundImage:
                      "url(" +
                      backImages[unPinnedNote.backImageKey][
                        `${unPinnedNote.backImageKey}_${theme}`
                      ] +
                      ")",
                    backgroundSize: "cover",
                    backgroundPositionY: "bottom",
                    border:
                      "1px solid " +
                      colors[unPinnedNote.colorKey][
                        `${unPinnedNote.colorKey}_${theme}`
                      ],
                  }}
                >
                  <div className="header">
                    <div className="title">{unPinnedNote.title}</div>
                    <div
                      className={`iconCon ${theme} hoverable`}
                      onClick={() => pinNote(unPinnedNote.id)}
                    >
                      <BsPin className="icon" />
                      <div className="info">Pin</div>
                    </div>
                  </div>
                  <div className="description">{unPinnedNote.description}</div>
                  <div className="actions">
                    <div className="left">
                      <div
                        className={`iconCon ${theme} palette hoverable`}
                        onClick={(e) => {
                          handleNoteBackground(e, unPinnedNote.id);
                        }}
                      >
                        <IoIosColorPalette className="icon" />
                        <div className="info">Background options</div>
                        {isBackgroundPaletteActive && (
                          <div
                            className="backgroundPalette"
                            ref={(elem) =>
                              (backgroundPalettesRef.current[
                                `${unPinnedNote.id}`
                              ] = elem)
                            }
                          >
                            <BackgroundPalette
                              colKey={unPinnedNote.colorKey}
                              imgKey={unPinnedNote.backImageKey}
                              handleNoteColKey={handleNoteColKey}
                              handleNoteImgKey={handleNoteImgKey}
                              noteId={unPinnedNote.id}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className={`iconCon ${theme} hoverable`}
                        onClick={() => {
                          copyNote(unPinnedNote);
                        }}
                      >
                        <MdContentCopy className="icon" />
                        <div className="info">Copy</div>
                      </div>
                      <div
                        className={`iconCon ${theme} hoverable`}
                        onClick={() => {
                          archiveNote(unPinnedNote.id);
                        }}
                      >
                        <MdArchive className="icon" />
                        <div className="info">Archive</div>
                      </div>
                      <div
                        className={`iconCon ${theme} hoverable`}
                        onClick={() => deleteNote(unPinnedNote.id)}
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    currUser: state.auth.currUser,
    theme: state.app.theme,
    isCreateNoteConActive: state.app.isCreateNoteConActive,
    isBackgroundPaletteActive: state.app.isBackgroundPaletteActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAndSetActiveNotes: (userId) => dispatch(getAndSetActiveNotes(userId)),
    setIsCreateNoteConActive: () => dispatch(setIsCreateNoteConActive()),
    resetIsCreateNoteConActive: () => dispatch(resetIsCreateNoteConActive()),
    setIsBackgroundPaletteActive: () =>
      dispatch(setIsBackgroundPaletteActive()),
    resetIsBackgroundPaletteActive: () =>
      dispatch(resetIsBackgroundPaletteActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
