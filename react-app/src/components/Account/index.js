/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// local files
import "./Account.css";
// import coverphoto from '../../assets/coverphoto.jpg'
// import profilePic from '../../assets/buddyicon.png';
import { thunkReadAllStoriesByUser } from "../../store/storiesReducer";
import { Redirect } from "react-router-dom";

/******************************* COMPONENT *******************************/
function Account() {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);

  /************ key into pertinent values ************/
  const stories = useSelector((state) =>
    Object.values(state.stories.userStories)
  );

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllStoriesByUser());
  }, [dispatch]);

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="page-wrapper-container">
      <div
        className="account-component"
        // style={{
        //     backgroundImage:`url(${coverphoto})`,
        //     backgroundRepeat:"no-repeat",
        //     backgroundPosition: "center",
        //     backgroundSize: "cover",
        //     }}
      >
        <div className="account-info-container">
          <div className="account-info-left-container">
            <div className="account-profile-pic-container">
              {/* <img alt='' src={profilePic} className="account-profile-pic"></img> */}
            </div>
            <div className="account-profile-names-container">
              {/* <h1 id="banner-user-full-name">{sessionUser.firstName} {sessionUser.lastName}</h1> */}
              <h1 id="banner-user-full-name">
                {sessionUser.firstName} {sessionUser.lastName}
              </h1>
              <p id="banner-user-username">{sessionUser.username}</p>
            </div>
          </div>

          <div className="account-info-right-container">
            <div className="account-user-stats-container">
              <div>
                {stories && stories.length} Story
                {stories.length === 1 ? "" : "s"}
              </div>
              {/* <div>Joined 2022</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
