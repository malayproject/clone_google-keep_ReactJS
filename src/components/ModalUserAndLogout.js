import React from "react";
import { connect } from "react-redux";
import { resetModalUserAndLogoutActive } from "../redux/app/AppActions";
import { logout } from "../redux/auth/AuthActions";

const ModalUserAndLogout = ({
  currUser,
  theme,
  logout,
  resetModalUserAndLogoutActive,
}) => {
  return (
    <div
      className={`modalUserAndLogoutCon ${theme}`}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target.classList.contains("modalUserAndLogoutCon")) {
          resetModalUserAndLogoutActive();
        }
      }}
    >
      <div className="modalUserAndLogout">
        <div className="userInfo">
          <div className="dp">
            <img src={currUser.photoURL} alt="userpic.png" />
          </div>
          <div className="dn">{currUser.displayName}</div>
          <div className="ei">{currUser.email}</div>
        </div>
        <button
          className="logout hoverable"
          onClick={() => {
            resetModalUserAndLogoutActive();
            logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.settingsParameters.darkTheme ? "dark" : "",
    currUser: state.auth.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    resetModalUserAndLogoutActive: () =>
      dispatch(resetModalUserAndLogoutActive()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserAndLogout);
