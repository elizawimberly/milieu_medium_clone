/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// local files
import "./SplashPage.css";
import { thunkReadAllStories } from "../../store/storiesReducer";

/******************************* COMPONENT *******************************/
function SplashPage() {
  /****************** access store *******************/
  const storiesState = useSelector((state) => state.stories);

  /************ key into pertinent values ************/
  const allStories = storiesState.allStories;
  const allStoriesArr = Object.values(allStories);

  console.log(allStoriesArr);

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadAllStories());
  }, [dispatch]);

  /**************** render component *****************/
  return (
    <>
      <div className="page-wrapper-container">
        Splash Page
        <div className="splash-component">
          <div className="splash-story-feed">
            {allStoriesArr &&
              allStoriesArr.map((story) => (
                <Link to={`/stories/${story.id}`} key={`${story.id}`}>
                  Here's the story link to story id#: {story.id}
                </Link>
              ))}
          </div>
        </div>
      </div>
      {/* <FooterAccount /> */}
    </>
  );
}

/******************************** EXPORTS ********************************/
export default SplashPage;
