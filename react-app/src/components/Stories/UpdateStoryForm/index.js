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

  const [loaded, setLoaded] = useState(false);
  const [dropDown, setDropDown] = useState("album-dropdown-hide");

  const longDate = new Date();
  const year = longDate.getFullYear();
  let month = longDate.getMonth() + 1;
  let day = longDate.getDate() + 1;
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${Number(day + 1)}`;
  const date = `${year}-${month}-${day}`;

  // useEffect(() => {
  //   dispatch(thunkReadAllAlbums());
  //   if (albumId) {
  //     dispatch(thunkReadSingleAlbumDetails(albumId));
  //   }
  // }, [dispatch, albumId]);

  useEffect(() => {
    setLoaded(true);
    dispatch(thunkReadSingleStoryDetails(storyId));
    // if (album) {
    //   if (albumName === null || albumName === undefined)
    //     setAlbumName(album.name);
    // }
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

  /***************** handle events *******************/

  /***************** handle submit *******************/

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    if (!title) errors.push("Title needs to be between 2 and 50 characters.");
    if (!content)
      errors.push("Story content needs to be between 10 and 10000 characters.");
    if (!image) errors.push("You must enter a valid url");
    if (
      !image ||
      checkImage ===
        "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
    )
      errors.push("You must enter a valid url");
    if (errors.length >= 1) setValidationErrors(errors);

    let storyObj = {
      title,
      content,
      image,
    };

    if (errors.length <= 1 && validationErrors <= 1) {
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

  // const onError = (e) => {
  //   setCheckUrl(
  //     "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
  //   );
  //   e.target.src =
  //     "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png";
  // };

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="page-wrapper-container">
        {story.title && loaded && (
          <div id="PhotoCreateForm-component">
            <div className="photo-form-container">
              <form className="photo-form-container" onSubmit={handleSubmit}>
                <div className="mock-upload-navbar">
                  <button
                    className="photo-submit-button"
                    type="submit"
                    disabled={!!validationErrors.length}
                  >
                    Update Your Story
                  </button>
                </div>
                <div className="photo-form-top-sub-container">
                  <div className="photo-form-top-left-sub-container">
                    <label>
                      <input
                        className="inputFieldTypeText"
                        type="text"
                        name="title"
                        placeholder="Add a title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required={true}
                        minLength={2}
                        maxLength={500}
                      />
                    </label>

                    <label>
                      <input
                        className="inputFieldTypeText"
                        type="text"
                        name="content"
                        placeholder="Update your article"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                      />
                    </label>

                    <label>
                      <input
                        className="inputFieldTypeText"
                        type="text"
                        name="image"
                        placeholder="Add a photo url"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required={true}
                        minLength={2}
                        maxLength={500}
                      />
                    </label>
                  </div>
                  {/* <div className="photo-form-top-right-sub-container">
                    {url && (
                      <div className="view-uploaded-image">
                        <img onError={onError} alt="" src={url} />
                      </div>
                    )}
                  </div> */}
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
