/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
//local files
import { login } from "../../store/session";
import "./Auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  /**************** render component *****************/

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="page-wrapper-container">
      <div className="background-image-container">
        {/* <img className="background-image" alt='background' src={background}></img> */}
      </div>

      <div className="LoginForm-and-SignUpForm-components">
        <div className="login-signup-form" id="login-form">
          <div>
            <p className="login-signup-form-prompt">Log in to Melieu</p>
          </div>

          <form onSubmit={onLogin}>
            <div>
              {/* <label htmlFor="email">Email</label> */}
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                required={true}
                minLength={2}
                maxLength={50}
                className="login-signup-form-input-field"
              />
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                required={true}
                minLength={2}
                maxLength={50}
                className="login-signup-form-input-field"
              />
              {/* <button type="submit">Login</button> */}
            </div>

            <div className="errors-container">
              {errors.map((error, ind) => (
                <div className="form-errors" key={ind}>
                  {error}
                </div>
              ))}
            </div>

            <button type="submit" className="login-signup-form-button">
              Sign in
            </button>

            <div onClick={demoUser} className="demo-signup-form-button">
              Continue as Demo User
            </div>
          </form>

          <div className="form-redirect-prompt">
            Not a Milieu member?{" "}
            <span>
              <NavLink to="/sign-up" exact={true} className="form-link">
                Sign up here.
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
