import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user.slice";
import logoHeader from "../assets/argentBankLogo.png";

// The header component

export default function Header() {
  const dispatch = useDispatch();

  const { firstname, isConnect } = useSelector((state) => state.user); // Select the 'firstname' and 'isConnect' properties from the Redux store's 'user' state

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logoHeader}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to={isConnect ? "/profile" : "/signin"}>
          <i className="fa fa-user-circle"></i>
          {isConnect ? firstname : "Sign In"}{" "}
          {/* Display the user's first name or 'Sign In' based on their connection status */}
        </Link>
        {isConnect && (
          <Link className="main-nav-item" onClick={() => dispatch(logout())}>
            <i className="fa fa-user-circle"></i> {/* Display an icon */}
            Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}
