/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// local files
import { thunkReadAllStories } from "../../store/storiesReducer";
import "./SplashPage.css";

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
        <div className="splash-title-container">
          <div className="splash-heading">
            <div className="splash-big-title">Stay Curious.</div>
            <div className="splash-small-title">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </div>
          </div>
        </div>
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
