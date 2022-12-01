/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//local files
import {
  thunkReadSingleStoryDetails,
  thunkUpdateSingleStory,
} from "../../../store/storiesReducer";

import "./UpdateStoryForm.css";
import defaultPhoto from "../../../assets/placeholder.jpeg";
// import FooterAccount from "../../Footer/FooterAccount";

/********************** COMPONENT ******************/

function StoryUpdateForm() {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);
  const story = useSelector((state) => state.stories.singleStoryDetails);

  /************ reducer/API communication ************/
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { storyId } = params;

  /****************** manage state *******************/
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);

  const [checkImage, setCheckImage] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dropDown, setDropDown] = useState("album-dropdown-hide");

  useEffect(() => {
    setLoaded(true);
    dispatch(thunkReadSingleStoryDetails(storyId));

    if (story.title) {
      if (title === null || title === undefined) setTitle(story.title);
      if (content === null || content === undefined) setContent(story.content);
      if (image === null || image === undefined) setImage(story.image);
    }
  }, [
    dispatch,
    story.title,
    title,
    content,
    image,
    story.content,
    story.image,
    storyId,
  ]);

  useEffect(() => {
    let errors = [];
    if (title && title.length < 3) {
      errors.push("Title needs to be between 3 and 50 characters.");
    }

    if (content && (content.length < 5 || content.length > 10000)) {
      errors.push(
        "Please enter content that is between 5 and 10,000 characters"
      );
    }
    if (image && (image.length < 5 || image.length > 500)) {
      errors.push(
        "Please enter an image url that is between 5 to 500 characters"
      );
    }

    if (
      image &&
      !image.endsWith(".jpg") &&
      !image.endsWith(".jpeg") &&
      !image.endsWith(".png") &&
      !image.endsWith(".webp") &&
      !image.endsWith(".avif") &&
      !image.endsWith(".gif") &&
      !image.endsWith(".svg")
    ) {
      errors.push(
        "Image url must end with jpg, jpeg, png, webp, avif, gif, or svg"
      );
    }
    if (image && !image.startsWith("http") && !image.endsWith("https")) {
      errors.push("Image url must start with http or https");
    }

    setValidationErrors(errors);
  }, [submitted, title, content, image]);

  /***************** handle events *******************/

  /***************** handle submit *******************/

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validationErrors.length) {
      return;
    }

    let storyObj = {
      title,
      content,
      image,
    };
    let errors = [];

    if (validationErrors < 1) {
      dispatch(thunkUpdateSingleStory(storyObj, storyId)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) errors.push(data.errors);
        setValidationErrors(errors);
      });
    }

    if (errors.length <= 0) {
      setTitle("");
      setContent("");
      setImage("");
      history.push(`/stories/${storyId}`);
    }
  };

  /***************** handle errors *******************/

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="page-wrapper-container">
        {story.title && loaded && (
          <div className="LoginForm-and-SignUpForm-components">
            <div className="login-signup-form" id="create-form">
              <form onSubmit={handleSubmit}>
                {/* <div className="mock-upload-navbar">
                  <button
                    className="photo-submit-button"
                    type="submit"
                    disabled={!!validationErrors.length}
                  >
                    Update Your Story
                  </button>
                </div> */}
                <div className="photo-form-top-sub-container">
                  <div className="story-form-top-left-sub-container">
                    <label>
                      <input
                        className="login-signup-form-input-field"
                        id="title-field"
                        type="text"
                        name="title"
                        placeholder="Add a title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required={true}
                        // minLength={2}
                        // maxLength={500}
                      />
                    </label>

                    <label>
                      <input
                        className="login-signup-form-input-field"
                        // id="title-field"
                        id="image-field"
                        type="text"
                        name="image"
                        placeholder="Add a photo url"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required={true}
                        // minLength={2}
                        // maxLength={500}
                        onError={(e) => (e.currentTarget.src = defaultPhoto)}
                      />
                    </label>

                    <label>
                      <textarea
                        className="login-signup-form-input-field"
                        type="text"
                        id="story-field"
                        name="content"
                        placeholder="Update your article"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        required={true}
                      />
                    </label>

                    <div className="errors-container">
                      {submitted &&
                        validationErrors &&
                        validationErrors.map((error, i = 0) => (
                          <div className="form-errors" key={i}>
                            {error}
                          </div>
                        ))}
                    </div>

                    {/* button here */}
                    <div className="mock-upload-navbar">
                      <button
                        className="login-signup-form-button"
                        type="submit"
                      >
                        Update Your Story
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* <FooterAccount /> */}
    </>
  );
}

export default StoryUpdateForm;
