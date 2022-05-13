import React from "react";
import { connect } from "react-redux";
import { logout } from "../redux/auth/AuthActions";
import { FaBars, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ currUser, theme, logout }) => {
  const navigate = useNavigate();

  return (
    <div className={`navbar ${theme}`}>
      <div className="left">
        <div className={`iconCon ${theme} hoverable`}>
          <FaBars className="icon" />
          <div className="info">Sidebar menu</div>
        </div>
        <div className="brandCon">
          <img
            src={
              "https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            }
            className="brandImg"
          />
          <div className="">Clone Keep</div>
        </div>
      </div>
      <div className="right">
        <div
          className={`iconCon ${theme} hoverable`}
          onClick={() => navigate("/settings")}
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
    theme: state.app.theme,
    currUser: state.auth.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
