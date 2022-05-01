import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <h1>404</h1>
      <h4>The page you are trying to access doesn't appear to exist</h4>
      <button onClick={() => navigate("/")}>Go to homepage</button>
    </div>
  );
};

export default ErrorPage;
