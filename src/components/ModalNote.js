import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { resetAndHideModalNote } from "../redux/notes/NotesActions";
import { backImages, colors } from "./BackgroundPaletteData";
import { BsPin, BsPinFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { MdArchive, MdDelete, MdContentCopy } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";

const ModalNote = ({ modalNote, modalSrc, theme, resetAndHideModalNote }) => {
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
    e.target.style.height = `${Math.min(e.target.scrollHeight + 20, 200)}px`;
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
            colors[modalNote.colorKey][`${modalNote.colorKey}_${theme}`] ===
            "transparent"
              ? theme
                ? "#222"
                : "#eee"
              : colors[modalNote.colorKey][`${modalNote.colorKey}_${theme}`],
          backgroundImage:
            "url(" +
            backImages[modalNote.backImageKey][
              `${modalNote.backImageKey}_${theme}`
            ] +
            ")",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
          border:
            "1px solid " +
            colors[modalNote.colorKey][`${modalNote.colorKey}_${theme}`],
        }}
      >
        <div className="header">
          <textarea
            placeholder="title"
            className={`newTitle ${theme}`}
            value={modalNote.title}
            // onChange={handleTitleChange}
            onChange={() => {}}
          />
          {modalNote.isPinned ? (
            <div
              className={`iconCon ${theme} hoverable`}
              //   onClick={() => handleIsPinned(false)}
            >
              <BsPinFill className="icon" />
              <div className="info">Unpin note</div>
            </div>
          ) : (
            <div
              className={`iconCon ${theme} hoverable`}
              //   onClick={() => handleIsPinned(true)}
            >
              <BsPin className="icon" />
              <div className="info">Pin note</div>
            </div>
          )}
        </div>
        <textarea
          placeholder="take a note..."
          className={`newDescription ${theme}`}
          value={modalNote.description}
          //   onChange={handleDescriptionChange}
          autoFocus
          onChange={() => {}}
          style={{ height: "fit-content" }}
          onKeyDown={(e) => handleDescriptionHeightGrowth(e)}
        />
        <div className="actions">
          <div className="left">
            <div
              className={`iconCon palette ${theme} hoverable`}
              //   onClick={(e) => {
              //     handleNoteBackground(e);
              //   }}
            >
              <IoIosColorPalette className="icon" />
              <div className="info">Background options</div>
              {/* {isBackgroundPaletteActive && (
                <div className="backgroundPalette" ref={backgroundPaletteRef}>
                  <BackgroundPalette
                    colKey={modalNote.colorKey}
                    imgKey={modalNote.backImageKey}
                    handleColKey={handleColKey}
                    handleImgKey={handleImgKey}
                  />
                </div>
              )} */}
              {/* <BackgroundPalette /> */}
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              //   onClick={() => addNoteToDB()}
            >
              <MdContentCopy className="icon" />
              <div className="info">Copy note</div>
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              //   onClick={() => handleIsArchivedAndUpdateDB()}
            >
              <MdArchive className="icon" />
              <div className="info">Archive note</div>
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              //   onClick={() => handleIsTrashedAndUpdateDB()}
            >
              <MdDelete className="icon" />
              <div className="info">Delete note</div>
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              //   onClick={() => {
              //     handleClearNote();
              //   }}
            >
              <BiReset className="icon" />
              <div className="info">Clear note</div>
            </div>
          </div>
          <div className="right">
            <div className="top">
              {(modalSrc !== "notes"
                ? modalSrc === "archive"
                  ? "note in archive . "
                  : "note in trash . "
                : "") +
                "Edited " +
                modalNote.editedOn.slice(4, 10)}
            </div>
            <div className="bottom">
              <button
                className={`${theme} hoverable`}

                // onClick={() => {
                //   addNoteToDBAndReset();
                // }}
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
    theme: state.app.theme,
    modalNote: state.notes.modalNote,
    modalSrc: state.notes.modalSrc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAndHideModalNote: () => dispatch(resetAndHideModalNote()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNote);
