import React from "react";
import { connect } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaLightbulb, FaArchive, FaTrash } from "react-icons/fa";

const UserHome = ({ theme }) => {
  return (
    <div className="userHome">
      <Navbar />
      <div className="restBody">
        <div className="sidebar">
          <NavLink to="/user-notes" end className={`sideLink ${theme}`}>
            <FaLightbulb className="icon" />
            <div>Notes</div>
          </NavLink>
          <NavLink to="/user-notes/archive" className={`sideLink ${theme}`}>
            <FaArchive className="icon" />
            <div>Archive</div>
          </NavLink>
          <NavLink to="/user-notes/trash" className={`sideLink ${theme}`}>
            <FaTrash className="icon" />
            <div>Trash</div>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.theme,
  };
};

export default connect(mapStateToProps)(UserHome);
