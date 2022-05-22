import React from "react";
import { connect } from "react-redux";
import { logout } from "../redux/auth/AuthActions";
import { FaBars, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  resetSidebarExpand,
  setModalSettingsActive,
  setSidebarExpand,
} from "../redux/app/AppActions";
import Keep from "../images/clone-keep.svg";

const Navbar = ({
  currUser,
  theme,
  logout,
  isSidebarExpanded,
  setSidebarExpand,
  resetSidebarExpand,
  setModalSettingsActive,
}) => {
  const navigate = useNavigate();
  return (
    <div className={`navbar ${theme}`}>
      <div className="left">
        <div
          className={`iconCon ${theme} hoverable`}
          onClick={() => {
            isSidebarExpanded ? resetSidebarExpand() : setSidebarExpand();
          }}
        >
          <FaBars className="icon" />
          <div className="info">Sidebar menu</div>
        </div>
        <div className="brandCon">
          <img src={Keep} className="brandImg" />
          <div className="">Clone Keep</div>
        </div>
      </div>
      <div className="right">
        <div
          className={`iconCon ${theme} hoverable`}
          onClick={() => setModalSettingsActive()}
        >
          <FaCog className="icon" />
          <div className="info">Settings</div>
        </div>
        <div className={`iconCon ${theme} hoverable`}>
          <img
            src={currUser.photoURL}
            className="profileImg"
            onClick={logout}
          />
          <div className="info">
            User Account
            <br />
            {currUser.displayName}
            <br />
            {currUser.email}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.settingsParameters.darkTheme ? "dark" : "",
    currUser: state.auth.currUser,
    isSidebarExpanded: state.app.isSidebarExpanded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setSidebarExpand: () => dispatch(setSidebarExpand()),
    resetSidebarExpand: () => dispatch(resetSidebarExpand()),
    setModalSettingsActive: () => dispatch(setModalSettingsActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
