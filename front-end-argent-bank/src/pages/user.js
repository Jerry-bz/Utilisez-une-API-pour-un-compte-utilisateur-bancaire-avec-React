import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Identity from "../components/identity";
import { getSession, getProfile } from "../features/user.slice";
import { setAuthHeader } from "../features/user.api";
import '../styles/user.css'

// The user page component.

export default function User() {
  const data = useSelector((state) => state.user);
  const { isConnect } = useSelector((state) => state.user); // Select the 'isConnect' property from the Redux store's 'user' state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // If there is a token in session storage, dispatch 'getSession' and 'getProfile', and set the authorization header
    if (sessionStorage.getItem("token") != null) {
      dispatch(getSession(sessionStorage.getItem("token")));
      setAuthHeader(sessionStorage.getItem("token"));
      dispatch(getProfile());
    }

    // If the user is not connected, redirect to the sign-in page
    !isConnect && navigate("/signin");
  }, [isConnect, navigate, dispatch]);

  return (
    <main className="user" data={data}>
      <Identity informations={data} />
      <section className="user_account">
        <div className="user_account-content-wrapper">
          <h3 className="user_account-title">Argent Bank Checking (x8349)</h3>
          <p className="user_account-amount">$2,082.79</p>
          <p className="user_account-amount-description">Available Balance</p>
        </div>
        <div className="user_account-content-wrapper cta">
          <button className="user_transaction-button">View transactions</button>
        </div>
      </section>
      <section className="user_account">
        <div className="user_account-content-wrapper">
          <h3 className="user_account-title">Argent Bank Savings (x6712)</h3>
          <p className="user_account-amount">$10,928.42</p>
          <p className="user_account-amount-description">Available Balance</p>
        </div>
        <div className="user_account-content-wrapper cta">
          <button className="user_transaction-button">View transactions</button>
        </div>
      </section>
      <section className="user_account">
        <div className="user_account-content-wrapper">
          <h3 className="user_account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="user_account-amount">$184.30</p>
          <p className="user_account-amount-description">Current Balance</p>
        </div>
        <div className="user_account-content-wrapper cta">
          <button className="user_transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
