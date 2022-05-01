import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDarkTheme, setLightTheme } from "../redux/app/AppActions";

const Settingspage = ({ theme, setDark, setLight }) => {
  const navigate = useNavigate(-1);
  return (
    <div className="settingsPage">
      <label>Theme:</label>
      {theme ? (
        <button id="theme" onClick={setLight}>
          light
        </button>
      ) : (
        <button id="theme" onClick={setDark}>
          dark
        </button>
      )}
      <button onClick={() => navigate("/user-notes")}>Ok</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDark: () => dispatch(setDarkTheme()),
    setLight: () => dispatch(setLightTheme()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settingspage);
