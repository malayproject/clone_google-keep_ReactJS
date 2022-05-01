import React from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";

const Landingpage = ({ isAuthenticated }) => {
  return (
    <div className="landingPage">
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Landingpage);
