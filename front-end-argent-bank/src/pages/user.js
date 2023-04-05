import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Identity from "../components/identity";
import { getSession, getProfile } from "../features/user.slice";
import { setAuthHeader } from "../features/user.api";

 // The user page component

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
    <main className="main bg-dark" data={data}>
      <h2 className="sr-only">Accounts</h2>
      <Identity informations={data} />
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
