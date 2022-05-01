import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import authenticate from "../redux/auth/AuthActions";

const LoginPage = ({ isAuthenticated, authenticate }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user-notes");
    }
  }, [isAuthenticated]);

  return (
    <div className="loginPage">
      <h2>Login</h2>
      <button onClick={authenticate}>Signin with Google</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
