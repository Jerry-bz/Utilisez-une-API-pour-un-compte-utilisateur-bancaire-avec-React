import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getToken, getSession } from "../features/user.slice";
import { setAuthHeader } from "../features/user.api";
import "../styles/sign.in.css";

// The sign-in page component

export default function SignIn() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { message } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Handles the sign-in form submission
  const handleSubmit = async () => {
    await dispatch(getToken({ email, password }));
    setAuthHeader(sessionStorage.getItem("token"));
    dispatch(getProfile());
    navigate("/profile");
  };

  useEffect(() => {
    // Checks if the user is already authenticated and redirects to the user page
    if (sessionStorage.getItem("token") != null) {
      dispatch(getSession(sessionStorage.getItem("token")));
      navigate("/profile");
    }
  }, [dispatch, navigate]);

  return (
    <main className="signin">
      <section className="signin_content">
        <i className="fa fa-user-circle signin_icon"></i>
        <h1>Sign In</h1>
        <div className="signin_imput-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signin_imput-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signin_input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {message && <p className="signin_error-auth">{message}</p>}
        <button className="signin_button" onClick={() => handleSubmit()}>
          Sign In
        </button>
      </section>
    </main>
  );
}
