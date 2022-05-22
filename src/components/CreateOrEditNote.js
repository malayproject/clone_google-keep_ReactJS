import React, { useEffect, useState, useRef } from "react";
import { BsPin, BsPinFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { MdArchive, MdDelete, MdContentCopy } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { connect } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { usersColRef } from "../firebaseFolder/FirebaseApp";
import {
  resetIsBackgroundPaletteActive,
  resetIsCreateNoteConActive,
  setIsBackgroundPaletteActive,
  setIsCreateNoteConActive,
} from "../redux/app/AppActions";
import { getAndSetActiveNotes } from "../redux/notes/NotesActions";
import BackgroundPalette from "./BackgroundPalette";
import { backImages, colors } from "./BackgroundPaletteData";

const CreateOrEditNote = ({
  theme,
  currUser,
  resetIsCreateNoteConActive,
  getAndSetActiveNotes,
  isBackgroundPaletteActive,
  setIsBackgroundPaletteActive,
  resetIsBackgroundPaletteActive,
}) => {
  const initialNewNoteState = {
    title: "",
    description: "",
    colorKey: 0,
    backImageKey: 0,
    isPinned: false,
    isArchived: false,
    isTrashed: false,
    editedOn: "",
    createdOn: "",
  };
  const [newNoteState, setNewNoteState] = useState(initialNewNoteState);

  const backgroundPaletteRef = useRef();

  const handleDescriptionHeightGrowth = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight + 20, 200)}px`;
  };

  const addNoteToDB = async () => {
    console.log("inside addNoteToDB");

    try {
      const doc = await addDoc(
        collection(usersColRef, `/${currUser.uid}/notes`),
        {
          title: newNoteState.title,
          description: newNoteState.description,
          colorKey: newNoteState.colorKey,
          backImageKey: newNoteState.backImageKey,
          editedOn: new Date().toString(),
          createdOn: new Date().toString(),
          isPinned: newNoteState.isPinned,
          isArchived: newNoteState.isArchived,
          isTrashed: newNoteState.isTrashed,
        }
      );
      getAndSetActiveNotes(currUser.uid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNoteToDBAndReset = async () => {
    if (newNoteState.title || newNoteState.description) {
      await addNoteToDB();
    }
    setNewNoteState(initialNewNoteState);
    resetIsCreateNoteConActive();
  };

  const handleClearNote = () => {
    setNewNoteState(initialNewNoteState);
  };

  const handleIsPinned = (isPinned) => {
    setNewNoteState((prev) => ({
      ...prev,
      isPinned: isPinned,
      isArchived: false,
      isTrashed: false,
    }));
  };

  const handleIsArchivedAndUpdateDB = () => {
    if (newNoteState.title || newNoteState.description) {
      setNewNoteState((prev) => ({
        ...prev,
        isArchived: true,
        isPinned: false,
        isTrashed: false,
      }));
    }
  };

  useEffect(() => {
    if (newNoteState.isArchived || newNoteState.isTrashed)
      addNoteToDBAndReset();
  }, [newNoteState.isArchived, newNoteState.isTrashed]);

  const handleIsTrashedAndUpdateDB = () => {
    if (newNoteState.title || newNoteState.description) {
      setNewNoteState((prev) => ({
        ...prev,
        isArchived: false,
        isPinned: false,
        isTrashed: true,
      }));
    }
  };

  const handleTitleChange = (e) => {
    setNewNoteState((prev) => {
      console.log(e.target.value);
      return { ...prev, title: e.target.value };
    });
  };

  const handleDescriptionChange = (e) => {
    setNewNoteState((prev) => {
      console.log(e.target.innerText);
      return { ...prev, description: e.target.value };
    });
  };

  const handleNoteBackground = (e) => {
    console.log("inside handleNoteBackground");
    console.dir(e.target);
    console.log(backgroundPaletteRef.current);
    if (
      e.target == backgroundPaletteRef.current ||
      backgroundPaletteRef.current?.contains?.(e.target)
    ) {
      console.log(e.target);
      return;
    }
    isBackgroundPaletteActive
      ? resetIsBackgroundPaletteActive()
      : setIsBackgroundPaletteActive();
  };

  const handleColKey = (selectedColKey) => {
    setNewNoteState((prev) => ({
      ...prev,
      colorKey: selectedColKey,
      editedOn: new Date().toString(),
    }));
  };

  const handleImgKey = (selectedImgKey) => {
    setNewNoteState((prev) => ({
      ...prev,
      backImageKey: selectedImgKey,
      editedOn: new Date().toString(),
    }));
  };

  return (
    <div className="createOrEditNote">
      <div
        className="newNote note"
        style={{
          backgroundColor:
            colors[newNoteState.colorKey][`${newNoteState.colorKey}_${theme}`],
          backgroundImage:
            "url(" +
            backImages[newNoteState.backImageKey][
              `${newNoteState.backImageKey}_${theme}`
            ] +
            ")",
          backgroundSize: "cover",
          backgroundPositionY: "bottom",
          border:
            "1px solid " +
            colors[newNoteState.colorKey][`${newNoteState.colorKey}_${theme}`],
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header">
          <textarea
            placeholder="title"
            className={`newTitle ${theme}`}
            value={newNoteState.title}
            onChange={handleTitleChange}
            // onKeyDown={handleTitleHeightGrowth}
          />
          {newNoteState.isPinned ? (
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={() => handleIsPinned(false)}
            >
              <BsPinFill className="icon" />
              <div className="info">Unpin note</div>
            </div>
          ) : (
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={() => handleIsPinned(true)}
            >
              <BsPin className="icon" />
              <div className="info">Pin note</div>
            </div>
          )}
        </div>
        <textarea
          placeholder="take a note..."
          className={`newDescription ${theme}`}
          value={newNoteState.description}
          onChange={handleDescriptionChange}
          onKeyDown={(e) => handleDescriptionHeightGrowth(e)}
          autoFocus
        />
        <div className="actions">
          <div className="left">
            <div
              className={`iconCon palette ${theme} hoverable`}
              onClick={(e) => {
                handleNoteBackground(e);
              }}
            >
              <IoIosColorPalette className="icon" />
              <div className="info">Background options</div>
              {isBackgroundPaletteActive && (
                <div className="backgroundPalette" ref={backgroundPaletteRef}>
                  <BackgroundPalette
                    colKey={newNoteState.colorKey}
                    imgKey={newNoteState.backImageKey}
                    handleColKey={handleColKey}
                    handleImgKey={handleImgKey}
                  />
                </div>
              )}
              {/* <BackgroundPalette /> */}
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={() => addNoteToDB()}
            >
              <MdContentCopy className="icon" />
              <div className="info">Copy note</div>
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={() => handleIsArchivedAndUpdateDB()}
            >
              <MdArchive className="icon" />
              <div className="info">Archive note</div>
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={() => handleIsTrashedAndUpdateDB()}
            >
              <MdDelete className="icon" />
              <div className="info">Delete note</div>
            </div>
            <div
              className={`iconCon ${theme} hoverable`}
              onClick={() => {
                handleClearNote();
              }}
            >
              <BiReset className="icon" />
              <div className="info">Clear note</div>
            </div>
          </div>
          <div className="right">
            <div className="top"></div>
            <div className="bottom">
              <button
                className={`${theme} hoverable`}
                onClick={() => {
                  addNoteToDBAndReset();
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
    theme: state.app.theme,
    currUser: state.auth.currUser,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditNote);
