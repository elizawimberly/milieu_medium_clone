import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkCreateSingleComment } from "../../../store/storiesReducer";

function CommentCreateForm({ onClose }) {
  /****************** access store *******************/
  const dispatch = useDispatch();

  const storiesState = useSelector((state) => state.stories);

  const story = storiesState.singleStoryDetails;

  /****************** manage state *******************/

  const [comment, setComment] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let errors = [];

    if (comment.length < 3 || comment.length > 500) {
      errors.push(
        "Please enter a comment that is between 3 and 500 characters"
      );
    }

    setValidationErrors(errors);
  }, [submitted, comment]);

  /***************** handle events *******************/

  const createComment = async (e) => {
    e.preventDefault();

    //NEW CODE:
    setSubmitted(true);
    if (validationErrors.length) {
      return;
    }

    await dispatch(thunkCreateSingleComment(story.id, comment));
    onClose();
  };

  /**************** render component *****************/
  return (
    <div className="modal-container">
      <p className="modal-title">Add a comment</p>

      <div className="modal-body">
        <form className="modal-form" onSubmit={createComment}>
          <label>
            <textarea
              className="modal-textarea-input-field"
              type="text"
              name="comment"
              placeholder="Add a comment"
              onChange={(e) => setComment(e.target.value)}
              required={true}
              // minLength={2}
              // maxLength={500}
              value={comment}
            ></textarea>
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

          <button className="modal-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentCreateForm;
