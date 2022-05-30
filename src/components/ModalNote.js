import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
} from "../redux/app/AppActions";
import {
  copyModalNote,
  archiveModalNote,
  resetAndHideModalNote,
  unArchiveModalNote,
  deleteModalForever,
  restoreModalNote,
  deleteNote,
  updateModalNote,
} from "../redux/notes/NotesActions";
import { backImages, colors } from "./BackgroundPaletteData";
import { BsPin, BsPinFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import {
  MdArchive,
  MdUnarchive,
  MdDelete,
  MdContentCopy,
  MdRestoreFromTrash,
  MdDeleteForever,
} from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import BackgroundPalette from "./BackgroundPalette";

const ModalNote = ({
  modalNote,
  modalSrc,
  theme,
  currUser,
  copyModalNote,
  archiveModalNote,
  unArchiveModalNote,
  resetAndHideModalNote,
  isBackgroundPaletteActive,
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
  restoreModalNote,
  deleteModalForever,
  deleteNote,
  updateModalNote,
  isNewestModeActive,
}) => {
  const [modalNoteState, setModalNoteState] = useState(modalNote);

  const modalNoteRef = useRef(null);

  const hideModal = (e) => {
    console.log("hideModal triggered", e);
    if (
      modalNoteRef.current === e.target ||
      modalNoteRef.current.contains(e.target)
    )
      return;
    resetAndHideModalNote();
  };

  const handleDescriptionHeightGrowth = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight + 20, 280)}px`;
    console.dir(e.target.parentNode);
    e.target.parentNode.style.height = `${Math.min(
      e.target.style.height + 70,
      270
    )}px`;
  };

  const handleNoteBackground = (e) => {
    // console.log("inside handleNoteBackground");
    // console.dir(e.target);
    // console.log(backgroundPaletteRef.current);
    // if (
    //   e.target == backgroundPaletteRef.current ||
    //   backgroundPaletteRef.current?.contains?.(e.target)
    // ) {
    //   console.log(e.target);
    //   return;
    // }
    isBackgroundPaletteActive
      ? resetIsBackgroundPaletteActive()
      : setIsBackgroundPaletteActive();
  };

  const handleTitleChange = (e) => {
    setModalNoteState((prev) => {
      console.log(e.target.innerText);
      return { ...prev, title: e.target.value, editedOn: new Date().valueOf() };
    });
  };

  const handleDescriptionChange = (e) => {
    setModalNoteState((prev) => {
      console.log(e.target.innerText);
      return {
        ...prev,
        description: e.target.value,
        editedOn: new Date().valueOf(),
      };
    });
  };

  const handleColKey = (selectedColKey) => {
    setModalNoteState((prev) => ({
      ...prev,
      colorKey: selectedColKey,
      editedOn: new Date().valueOf(),
    }));
  };

  const handleImgKey = (selectedImgKey) => {
    setModalNoteState((prev) => ({
      ...prev,
      backImageKey: selectedImgKey,
      editedOn: new Date().valueOf(),
    }));
  };

  const handleClearNote = () => {
    setModalNoteState(modalNote);
  };

  const handleIsPinned = (isPinned, e) => {
    e.stopPropagation();
    setModalNoteState((prev) => ({
      ...prev,
      isPinned: isPinned,
      isArchived: false,
      isTrashed: false,
      editedOn: new Date().valueOf(),
    }));
  };

  useEffect(() => {
    // console.log("modal hi");
    setTimeout(() => window.addEventListener("click", hideModal), 50);
    // window.addEventListener("click", hideModal);

    return () => {
      // console.log("modal bye");
      window.removeEventListener("click", hideModal);
    };
  }, []);

  return (
    <div className={`modalNoteCon ${theme}`}>
      <div
        className="modalNote note"
        ref={modalNoteRef}
        style={{
          backgroundColor:
            colors[modalNoteState.colorKey][
              `${modalNoteState.colorKey}_${theme}`
            ] === "transparent"
              ? theme
                ? "#222"
                : "#eee"
              : colors[modalNoteState.colorKey][
                  `${modalNoteState.colorKey}_${theme}`
                ],
          backgroundImage:
            "url(" +
            backImages[modalNoteState.backImageKey][
              `${modalNoteState.backImageKey}_${theme}`
            ] +
            ")",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
          border:
            "1px solid " +
            colors[modalNoteState.colorKey][
              `${modalNoteState.colorKey}_${theme}`
            ],
        }}
      >
        <div className="header">
          <textarea
            placeholder="title"
            className={`newTitle ${theme}`}
            value={modalNoteState.title}
            onChange={handleTitleChange}
          />
          {modalNoteState.isPinned ? (
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={(e) => handleIsPinned(false, e)}
            >
              <BsPinFill className="icon" />
              <div className="info">Unpin note</div>
            </div>
          ) : (
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={(e) => handleIsPinned(true, e)}
            >
              <BsPin className="icon" />
              <div className="info">Pin note</div>
            </div>
          )}
        </div>
        <textarea
          placeholder="take a note..."
          className={`newDescription ${theme}`}
          value={modalNoteState.description}
          onChange={handleDescriptionChange}
          autoFocus
          // onChange={() => {}}
          style={{ height: "fit-content" }}
          onKeyDown={(e) => handleDescriptionHeightGrowth(e)}
        />
        <div className="actions">
          <div className="left">
            {modalSrc !== "trash" && (
              <div
                className={`iconCon palette ${theme} hoverable`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNoteBackground(e);
                }}
              >
                <IoIosColorPalette className="icon" />
                <div className="info">Background options</div>
                {isBackgroundPaletteActive && (
                  <div className="backgroundPalette">
                    <BackgroundPalette
                      colKey={modalNoteState.colorKey}
                      imgKey={modalNoteState.backImageKey}
                      handleColKey={handleColKey}
                      handleImgKey={handleImgKey}
                    />
                  </div>
                )}
              </div>
            )}
            {modalSrc !== "trash" && (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() => {
                  copyModalNote(
                    modalNoteState,
                    currUser.uid,
                    isNewestModeActive
                  );
                }}
              >
                <MdContentCopy className="icon" />
                <div className="info">Copy note</div>
              </div>
            )}

            {modalSrc === "notes" ? (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() =>
                  archiveModalNote(
                    modalNoteState.id,
                    currUser.uid,
                    isNewestModeActive
                  )
                }
              >
                <MdArchive className="icon" />
                <div className="info">Archive note</div>
              </div>
            ) : modalSrc === "archive" ? (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() =>
                  unArchiveModalNote(modalNoteState.id, currUser.uid)
                }
              >
                <MdUnarchive className="icon" />
                <div className="info">Unarchive note</div>
              </div>
            ) : null}
            {modalSrc !== "trash" && (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() => {
                  handleClearNote();
                }}
              >
                <BiReset className="icon" />
                <div className="info">Clear note</div>
              </div>
            )}
            {modalSrc !== "trash" && (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() =>
                  deleteNote(
                    modalNote.id,
                    modalNote.isArchived,
                    currUser.uid,
                    isNewestModeActive,
                    true
                  )
                }
              >
                <MdDelete className="icon" />
                <div className="info">Delete note</div>
              </div>
            )}
            {modalSrc === "trash" && (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() =>
                  restoreModalNote(
                    modalNoteState.id,
                    currUser.uid,
                    isNewestModeActive
                  )
                }
              >
                <MdRestoreFromTrash className="icon" />
                <div className="info">Restore note</div>
              </div>
            )}
            {modalSrc === "trash" && (
              <div
                className={`iconCon ${theme} hoverable`}
                onClick={() =>
                  deleteModalForever(
                    modalNoteState.id,
                    "trash",
                    currUser.uid,
                    isNewestModeActive
                  )
                }
              >
                <MdDeleteForever className="icon" />
                <div className="info">Delete forever</div>
              </div>
            )}
          </div>
          <div className="right">
            <div className="top">
              {(modalSrc !== "notes"
                ? modalSrc === "archive"
                  ? "note in archive . "
                  : "note in trash . "
                : "") +
                "Edited " +
                Date(modalNoteState.editedOn).slice(4, 10)}
            </div>
            <div className="bottom">
              <button
                className={`${theme} hoverable`}
                onClick={() => {
                  updateModalNote(
                    modalNoteState,
                    modalSrc,
                    currUser.uid,
                    isNewestModeActive
                  );
                }}
              >
                Close
              </button>
              <div className={`iconCon ${theme} hoverable`} onClick={() => {}}>
                <BiDotsVerticalRounded className="icon" />
                <div className="info">More</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.settingsParameters.darkTheme ? "dark" : "",
    modalNote: state.notes.modalNote,
    modalSrc: state.notes.modalSrc,
    isBackgroundPaletteActive: state.app.isBackgroundPaletteActive,
    currUser: state.auth.currUser,
    isNewestModeActive: state.app.settingsParameters.newItemsAtBottom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAndHideModalNote: () => dispatch(resetAndHideModalNote()),
    setIsBackgroundPaletteActive: () =>
      dispatch(setIsBackgroundPaletteActive()),
    resetIsBackgroundPaletteActive: () =>
      dispatch(resetIsBackgroundPaletteActive()),
    copyModalNote: (note, userId, isNewestModeActive) =>
      dispatch(copyModalNote(note, userId, isNewestModeActive)),
    archiveModalNote: (noteId, userId, isNewestModeActive) =>
      dispatch(archiveModalNote(noteId, userId, isNewestModeActive)),
    unArchiveModalNote: (noteId, userId) =>
      dispatch(unArchiveModalNote(noteId, userId)),
    restoreModalNote: (noteId, userId, isNewestModeActive) =>
      dispatch(restoreModalNote(noteId, userId, isNewestModeActive)),
    deleteModalForever: (noteId, source, userId, isNewestModeActive) =>
      dispatch(deleteModalForever(noteId, source, userId, isNewestModeActive)),
    deleteNote: (noteId, isArchived, userId, isNewestModeActive, isModalNote) =>
      dispatch(
        deleteNote(noteId, isArchived, userId, isNewestModeActive, isModalNote)
      ),
    updateModalNote: (note, source, userId, isNewestModeActive) =>
      dispatch(updateModalNote(note, source, userId, isNewestModeActive)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNote);
