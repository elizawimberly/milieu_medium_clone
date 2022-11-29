/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkCreateSingleStory } from "../../../store/storiesReducer";
import "./CreateStoryForm.css";

// import FooterAccount from "../../Footer/FooterAccount";

/************************** COMPONENT ***************************/
function StoryCreateForm() {
  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);

  /************ key into pertinent values ************/
  // const longDate = new Date();
  // const year = longDate.getFullYear();
  // let month = longDate.getMonth() + 1;
  // let day = longDate.getDate() + 1;
  // if (month < 10) month = `0${month}`;
  // if (day < 10) day = `0${Number(day)}`;
  // const date = `${year}-${month}-${day}`;
  /****************** manage state *******************/
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [checkImage, setCheckImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [dropDown, setDropDown] = useState("album-dropdown-hide");

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(thunkReadAllAlbums());
  // }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (!title) errors.push("Name needs to be between 2 and 50 characters.");
    if (!content)
      errors.push("About needs to be between 10 and 10000 characters.");
    if (
      !image ||
      checkImage ===
        "https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png"
    )
      errors.push("You must enter a valid url");
    setValidationErrors(errors);
  }, [submitted, title, content, image, checkImage]);

  /***************** handle events *******************/
  const history = useHistory();

  /***************** handle submit *******************/

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    let newStory;
    setSubmitted(true);
    if (!title) errors.push("Title needs to be between 2 and 500 characters.");
    if (!content)
      errors.push("Content needs to be between 10 and 6000 characters.");
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

    console.log("storyObj:", storyObj);

    if (errors.length <= 1 && validationErrors <= 1) {
      newStory = await dispatch(thunkCreateSingleStory(storyObj)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) errors.push(data.errors);
          setValidationErrors(errors);
        }
      );
    }
    if (errors.length <= 0) {
      console.log("newStory:", newStory);
      setTitle("");
      setContent("");
      setImage("");
      history.push(`/stories/${newStory.id}`);
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
        <div id="PhotoCreateForm-component">
          <form className="photo-form-container" onSubmit={handleSubmit}>
            <div className="mock-upload-navbar">
              <button className="photo-submit-button" type="submit">
                Upload Your Story
              </button>
            </div>
            <div className="photo-form-top-sub-container">
              <div className="photo-form-top-left-sub-container">
                <label>
                  <input
                    className="inputFieldTypeText"
                    id="input-photo-name"
                    type="text"
                    name="title"
                    placeholder="Add a title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required={true}
                    minLength={2}
                    maxLength={500}
                  />
                  <input
                    className="inputFieldTypeText"
                    type="text"
                    name="content"
                    placeholder="Add your new article"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    required={true}
                    minLength={2}
                    maxLength={10000}
                  />
                </label>
                <label>
                  <input
                    className="inputFieldTypeText"
                    type="text"
                    name="url"
                    placeholder="Add a photo url"
                    onChange={(e) => {
                      setCheckImage(e.target.value);
                      setImage(e.target.value);
                    }}
                    value={image}
                    required={true}
                    minLength={2}
                    maxLength={500}
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
      {/* <FooterAccount /> */}
    </>
  );
}

/******************************** EXPORTS ********************************/
export default StoryCreateForm;
