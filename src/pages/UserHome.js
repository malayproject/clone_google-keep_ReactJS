import React from "react";
import { connect } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaLightbulb, FaArchive, FaTrash } from "react-icons/fa";

const UserHome = () => {
  return (
    <div className="userHome">
      <Navbar />
      <div className="restBody">
        <div className="sidebar">
          <NavLink to="/user-notes" end className="sideLink">
            <FaLightbulb className="icon" />
            <div>Notes</div>
          </NavLink>
          <NavLink to="/user-notes/archive" className="sideLink">
            <FaArchive className="icon" />
            <div>Archived</div>
          </NavLink>
          <NavLink to="/user-notes/trash" className="sideLink">
            <FaTrash className="icon" />
            <div>Trashed</div>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default connect(null)(UserHome);
