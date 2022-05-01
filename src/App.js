import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import UserHome from "./pages/UserHome";
import LoginPage from "./pages/LoginPage";
import { connect } from "react-redux";
import ErrorPage from "./pages/ErrorPage";
import Notes from "./components/Notes";
import Archived from "./components/Archived";
import Trashed from "./components/Trashed";
import { setAuthState } from "./redux/auth/AuthActions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseFolder/FirebaseApp";
import SettingsPage from "./pages/SettingsPage";

function App({ isAuthenticated, currUser, setAuthState }) {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated ? navigate("/user-notes") : navigate("/login");
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("inside App useEffect");
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        if (!currUser) setAuthState(user);
      } else {
        if (currUser) setAuthState(user);
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />}>
          <Route path="user-notes" element={isAuthenticated && <UserHome />}>
            <Route index element={<Notes />} />
            <Route path="archive" element={<Archived />} />
            <Route path="trash" element={<Trashed />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currUser: state.auth.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthState: (user) => dispatch(setAuthState(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
