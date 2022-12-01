/************************** IMPORTS ********************/
// libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import defaultPhoto from "../../../assets/placeholder.jpeg";

// local files
import "./SingleStoryPreview.css";

const SingleStoryPreview = ({ story }) => {
  return (
    <div className="story-preview-container">
      <NavLink className="" key={story.id} to={`/stories/${story.id}`}>
        <div>
          <div>
            <div>
              <img
                className="story-preview-image"
                src={story.image}
                alt={"story"}
                // onError={(e) =>
                //   (e.currentTarget.src =
                //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png")
                // }
                onError={(e) => (e.currentTarget.src = defaultPhoto)}
              />
            </div>
            <div className="">
              <div>{story.title}</div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SingleStoryPreview;
