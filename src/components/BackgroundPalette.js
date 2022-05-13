import React from "react";
import { connect } from "react-redux";
import { backImages, colors } from "./BackgroundPaletteData";
import { ReactComponent as NoColor } from "./no-color.svg";
import { MdOutlineImageNotSupported } from "react-icons/md";

const BackgroundPalette = ({ theme }) => {
  const handleColorSelection = () => {};
  const handleImageSelection = () => {};
  return (
    <div className={`backgroundPalette ${theme}`}>
      <div className="backgroundPaletteCon">
        <div className="backgroundColorCon">
          {colors.map((color, index) => {
            if (index) {
              return (
                <div
                  className={`backgroundColor ${theme}`}
                  key={index}
                  style={{
                    backgroundColor: color[`${index}_${theme}`],
                  }}
                  onClick={() => {
                    handleColorSelection();
                  }}
                />
              );
            } else {
              return (
                <div
                  className={`backgroundColor ${theme} selected`}
                  key={index}
                  onClick={() => {
                    handleColorSelection();
                  }}
                >
                  <NoColor className={`no-color ${theme}`} />
                </div>
              );
            }
          })}
        </div>
        <div className="backgroundImageCon">
          {backImages.map((backImage, index) => {
            if (index) {
              return (
                <div
                  className={`backgroundImage ${theme}`}
                  key={index}
                  style={{
                    backgroundImage:
                      "url(" + backImage[`${index}_${theme}`] + ")",
                  }}
                  onClick={() => {
                    handleImageSelection();
                  }}
                />
              );
            } else {
              return (
                <div
                  className={`backgroundImage ${theme} selected`}
                  key={index}
                  onClick={() => {
                    handleImageSelection();
                  }}
                >
                  <MdOutlineImageNotSupported className={`no-image ${theme}`} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.theme,
  };
};

export default connect(mapStateToProps, null)(BackgroundPalette);
