import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Header = (props) => {
  const { isAuthenticated, login, logout } = props.auth;

  console.log("is authenticated", props.auth);

  return (
    <nav className="Header">
      <NavLink className="Header-NavLink" to="/" exact>
        Home
      </NavLink>
      {" | "}
      <NavLink className="Header-NavLink" to="/courses">
        Courses
      </NavLink>
      {" | "}
      <NavLink className="Header-NavLink" to="/about">
        About
      </NavLink>
      {" | "}
      {isAuthenticated() ? (
        <>
          <NavLink className="Header-NavLink" to="/profile">
            Profile
          </NavLink>
          {" | "}
          <div className="Header-link" onClick={logout}>
            Logout
          </div>
        </>
      ) : (
        <div className="Header-link" onClick={login}>
          Login
        </div>
      )}
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Header;
