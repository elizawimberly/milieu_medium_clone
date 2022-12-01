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

  /****************** manage state *******************/
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  // const [checkImage, setCheckImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  // const [dropDown, setDropDown] = useState("album-dropdown-hide");

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    let errors = [];
    if (title.length < 3) {
      errors.push("Title needs to be between 3 and 50 characters.");
    }

    if (content.length < 5 || content.length > 10000) {
      errors.push(
        "Please enter content that is between 5 and 10,000 characters"
      );
    }
    if (image.length < 5 || image.length > 150) {
      errors.push(
        "Please enter an image url that is between 5 to 150 characters"
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
  const history = useHistory();

  /***************** handle submit *******************/

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    //NEW CODE:
    if (validationErrors.length) {
      return;
    }

    let errors = [];
    let newStory;

    let storyObj = {
      title,
      content,
      image,
    };

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
      setTitle("");
      setContent("");
      setImage("");
      history.push(`/stories/${newStory.id}`);
    }
  };

  /***************** handle errors *******************/

  /**************** render component *****************/
  if (!sessionUser) return <Redirect to="/" />;
  return (
    <>
      <div className="page-wrapper-container">
        <div className="LoginForm-and-SignUpForm-components">
          <div className="login-signup-form" id="login-form">
            <form onSubmit={handleSubmit}>
              <div className="photo-form-top-sub-container">
                <div className="photo-form-top-left-sub-container">
                  <label>
                    <input
                      className="login-signup-form-input-field"
                      id="input-photo-name"
                      type="text"
                      name="title"
                      placeholder="Add a title"
                      onChange={(e) => setTitle(e.target.value)}
                      // onChange={updateTitle}
                      value={title}
                      required={true}
                      // minLength={3}
                      // maxLength={500}
                    />
                    <label>
                      <input
                        className="login-signup-form-input-field"
                        type="text"
                        name="image"
                        placeholder="Add a photo url"
                        onChange={(e) => {
                          setImage(e.target.value);
                        }}
                        value={image}
                        required={true}
                        // minLength={2}
                        // maxLength={500}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png")
                        }
                      />
                    </label>
                    <input
                      className="login-signup-form-input-field"
                      type="text"
                      name="content"
                      placeholder="Add your new article"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                      required={true}
                      // minLength={2}
                      // maxLength={10000}
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
              </div>
              <div className="mock-upload-navbar">
                <button className="login-signup-form-button" type="submit">
                  Upload Your Story
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <FooterAccount /> */}
    </>
  );
}

/******************************** EXPORTS ********************************/
export default StoryCreateForm;
