import React from "react";
import { connect } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaLightbulb, FaArchive, FaTrash } from "react-icons/fa";

const UserHome = ({ theme, isSidebarExpanded }) => {
  return (
    <div className="userHome">
      <Navbar />
      <div className="restBody">
        <div className={`sidebar${isSidebarExpanded ? "" : " collapsed"}`}>
          <NavLink to="/user-notes" end className={`sideLink ${theme}`}>
            <FaLightbulb className="icon" />
            {isSidebarExpanded && <div>Notes</div>}
          </NavLink>
          <NavLink to="/user-notes/archive" className={`sideLink ${theme}`}>
            <FaArchive className="icon" />
            {isSidebarExpanded && <div>Archive</div>}
          </NavLink>
          <NavLink to="/user-notes/trash" className={`sideLink ${theme}`}>
            <FaTrash className="icon" />
            {isSidebarExpanded && <div>Trash</div>}
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.settingsParameters.darkTheme ? "dark" : "",
    isModalNoteActive: state.app.isModalNoteActive,
    isSidebarExpanded: state.app.isSidebarExpanded,
  };
};

export default connect(mapStateToProps)(UserHome);
