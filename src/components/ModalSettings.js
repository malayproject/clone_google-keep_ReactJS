import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  resetModalSettingsActive,
  resetSettingsParameters,
  setSettingsParameters,
} from "../redux/app/AppActions";
import { BiCheck } from "react-icons/bi";

const ModalSettings = ({
  settingsParameters,
  resetModalSettingsActive,
  setSettingsParameters,
  resetSettingsParameters,
}) => {
  const [tempParameters, setTempParameters] = useState({
    newItemsAtBottom: false,
    darkTheme: false,
  });

  const handleNewItemsAtBottom = (e) => {
    e.stopPropagation();
    setTempParameters((prev) => ({
      ...prev,
      newItemsAtBottom: !prev.newItemsAtBottom,
    }));
  };

  const handleDarkTheme = (e) => {
    e.stopPropagation();
    setTempParameters((prev) => ({ ...prev, darkTheme: !prev.darkTheme }));
  };

  useEffect(() => {
    setTempParameters((prev) => ({
      ...prev,
      newItemsAtBottom: settingsParameters.newItemsAtBottom,
      darkTheme: settingsParameters.darkTheme,
    }));
  }, []);

  return (
    <div
      className="modalSettingsCon"
      onClick={(e) => {
        e.stopPropagation();
        if (e.target.className === "modalSettingsCon") {
          resetModalSettingsActive();
        }
      }}
    >
      <div className="modalSettings">
        <div className="header">Settings</div>
        <section className="notesAndLists section">
          <div className="heading">Notes and Lists</div>
          <div className="body">
            <div className="item">
              <div className="left">Add new notes to the bottom</div>
              <div
                className="checkBox hoverable"
                onClick={handleNewItemsAtBottom}
              >
                {tempParameters.newItemsAtBottom && <BiCheck className="svg" />}
              </div>
            </div>
          </div>
        </section>
        <section className="appearance section">
          <div className="heading">Appearance</div>
          <div className="body">
            <div className="item">
              <div className="left">Enable dark theme</div>
              <div className="checkBox hoverable" onClick={handleDarkTheme}>
                {tempParameters.darkTheme && <BiCheck className="svg" />}
              </div>
            </div>
          </div>
        </section>
        <div className="footer">
          <button
            className="hoverable"
            onClick={() => {
              resetModalSettingsActive();
            }}
          >
            Cancel
          </button>
          <button
            className="hoverable"
            onClick={() => {
              setSettingsParameters(tempParameters);
              resetModalSettingsActive();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    settingsParameters: state.app.settingsParameters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetModalSettingsActive: () => dispatch(resetModalSettingsActive()),
    setSettingsParameters: (settings) =>
      dispatch(setSettingsParameters(settings)),
    resetSettingsParameters: () => dispatch(resetSettingsParameters()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSettings);
