/********************* IMPORTS ***********************/
// libraries
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//local files
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);

  /************* conditional components **************/
  let sessionOptions = (
    <div>
      <div>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </div>

      <div>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
    </div>
  );

  if (sessionUser) {
    sessionOptions = (
      <div>
        <LogoutButton />
      </div>
    );
  }

  /****************** COMPONENT ******************/
  return (
    <div className="nav-container">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>

      {/* <div>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </div>

      <div>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>

      <div>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
      </div> */}

      {/* <LogoutButton /> */}

      {sessionOptions}
    </div>
  );
};

export default NavBar;
