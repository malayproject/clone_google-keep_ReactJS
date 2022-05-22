import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import authenticate from "../redux/auth/AuthActions";
import Keep from "../images/clone-keep.svg";

const LoginPage = ({ isAuthenticated, authenticate }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user-notes");
    }
  }, [isAuthenticated]);

  return (
    <div className="loginPage">
      <div className="signinCon">
        <div className="signin">Your personal logger</div>
        <div className="brandCon">
          <img src={Keep} className="brandImg" />
          <div className="brandName">Clone Keep</div>
        </div>

        <button className="login-with-google-btn" onClick={authenticate}>
          Sign in with Google
        </button>
      </div>
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
