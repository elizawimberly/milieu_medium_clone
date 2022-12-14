import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "../NavigationBars/NavBar.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <button id="logout-button-id" className="nav-button" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
