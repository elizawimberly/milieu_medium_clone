/********************* IMPORTS ***********************/
// libraries
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//local files
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import milieuLogo from "../../assets/melieu-70w-logo.png";

const NavBar = () => {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);

  /************* conditional components **************/
  let sessionOptions = (
    <div className="nav-container-no-session">
      <div className="nav-container_two">
        <NavLink
          className="login"
          to="/login"
          exact={true}
          activeClassName="active"
        >
          Sign In
        </NavLink>
      </div>

      <div className="nav-container_three">
        <button className="nav-button">
          <NavLink
            className="signup"
            to="/sign-up"
            exact={true}
            activeClassName="active"
          >
            Get Started
          </NavLink>
        </button>
      </div>

      {/* <div>
        <button className="demo-button" onClick={handleDemo}>
          Demo User
        </button>
      </div> */}
    </div>
  );

  if (sessionUser) {
    sessionOptions = (
      <divn className="nav-container-five">
        <div className="nav-container_three">
          <button className="nav-button">
            <NavLink
              className="signup"
              to="/stories/upload"
              exact={true}
              activeClassName="active"
            >
              Write A Story
            </NavLink>
          </button>
        </div>

        <div className="logout-container">
          <LogoutButton />
        </div>
      </divn>
    );
  }

  /****************** COMPONENT ******************/
  return (
    <div className="nav-container">
      <div className="nav-container_four">
        <NavLink to="/" exact={true} activeClassName="active">
          <img src={milieuLogo} alt="milieu-logo" className="nav-logo" />
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
