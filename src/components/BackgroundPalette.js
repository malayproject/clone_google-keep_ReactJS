import React from "react";
import { connect, useSelector } from "react-redux";
import { backImageThumbs, colors } from "./BackgroundPaletteData";
import { ReactComponent as NoColor } from "./no-color.svg";
import { MdOutlineImageNotSupported } from "react-icons/md";

const BackgroundPalette = React.forwardRef(
  (
    {
      colKey,
      handleColKey,
      handleNoteColKey,
      imgKey,
      handleImgKey,
      handleNoteImgKey,
      noteId,
    },
    ref
  ) => {
    let theme = useSelector((state) => state.app.theme);
    const handleColorSelection = (selectedColKey, noteId) => {
      if (noteId) handleNoteColKey(selectedColKey, noteId);
      else handleColKey(selectedColKey);
    };
    const handleImageSelection = (selectedImgKey, noteId) => {
      if (noteId) handleNoteImgKey(selectedImgKey, noteId);
      else handleImgKey(selectedImgKey);
    };
    return (
      <div className={`backgroundPalette ${theme}`} ref={ref}>
        <div className="backgroundPaletteCon">
          <div className="backgroundColorCon">
            {colors.map((color, index) => {
              if (index) {
                return (
                  <div
                    className={`backgroundColor ${theme} ${
                      colKey === index ? "selected" : ""
                    }`}
                    key={index}
                    style={{
                      backgroundColor: color[`${index}_${theme}`],
                    }}
                    onClick={() => {
                      handleColorSelection(index, noteId);
                    }}
                  />
                );
              } else {
                return (
                  <div
                    className={`backgroundColor ${theme} ${
                      colKey === index ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      handleColorSelection(index, noteId);
                    }}
                  >
                    <NoColor className={`no-color ${theme}`} />
                  </div>
                );
              }
            })}
          </div>
          <div className="backgroundImageCon">
            {backImageThumbs.map((backImageThumb, index) => {
              if (index) {
                return (
                  <div
                    className={`backgroundImage ${theme} ${
                      imgKey === index ? "selected" : ""
                    }`}
                    key={index}
                    style={{
                      backgroundImage:
                        "url(" + backImageThumb[`${index}_${theme}`] + ")",
                    }}
                    onClick={() => {
                      handleImageSelection(index, noteId);
                    }}
                  />
                );
              } else {
                return (
                  <div
                    className={`backgroundImage ${theme} ${
                      imgKey === index ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      handleImageSelection(index, noteId);
                    }}
                  >
                    <MdOutlineImageNotSupported
                      className={`no-image ${theme}`}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default BackgroundPalette;
