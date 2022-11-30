/************************** IMPORTS **********************/
// libraries
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
//local files
import { signUp } from "../../store/session";

/********************** COMPONENT ************************/
const SignUpForm = () => {
  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /***************** handle events *******************/

  /***************** signUp events *******************/
  const onSignUp = async (e) => {
    let validationErrors = [];
    e.preventDefault();
    if (password !== repeatPassword)
      validationErrors.push("Those passwords didn't match. Please try again.");
    if (!email.includes("@"))
      validationErrors.push("Please enter a valid email address");
    setErrors(validationErrors);
    if (validationErrors.length <= 0) {
      const data = await dispatch(
        signUp(username, email, password, firstName, lastName)
      );
      if (data) {
        let dbErrors = data.map((error) => error.split(":")[1]);
        validationErrors.push(dbErrors);
        setErrors([...validationErrors]);
      }
    }
  };

  /***************** onChange events *******************/

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  /**************** render component *****************/
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={onSignUp}>
        <div>
          <label></label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={updateFirstName}
            value={firstName}
            required={true}
            minLength={2}
            maxLength={50}
            className="login-signup-form-input-field"
          ></input>
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={updateLastName}
            value={lastName}
            required={true}
            minLength={2}
            maxLength={50}
            className="login-signup-form-input-field"
          ></input>
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
            required={true}
            minLength={2}
            maxLength={50}
            className="login-signup-form-input-field"
          ></input>
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            onChange={updateEmail}
            value={email}
            required={true}
            minLength={2}
            maxLength={50}
            className="login-signup-form-input-field"
          ></input>
        </div>

        <div>
          <label></label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
            required={true}
            minLength={2}
            maxLength={50}
            className="login-signup-form-input-field"
          ></input>
        </div>

        <div>
          <label></label>
          <input
            type="password"
            name="repeat_password"
            placeholder="Confirm password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            minLength={2}
            maxLength={50}
            className="login-signup-form-input-field"
          ></input>
        </div>

        <div className="errors-container">
          {errors.map((error, ind) => (
            <div key={ind} className="form-errors">
              {error}
            </div>
          ))}
        </div>

        <button type="submit" className="login-signup-form-button">
          Sign up
        </button>
      </form>

      <div className="form-redirect-prompt">
        Already a Milieu member?{" "}
        <span>
          <NavLink to="/login" exact={true} className="form-link">
            Log in here.
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
