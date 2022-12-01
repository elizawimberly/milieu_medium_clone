import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateSingleComment } from "../../../store/storiesReducer";

function CommentUpdateForm({ onClose, comment }) {
  /****************** access store *******************/
  const dispatch = useDispatch();

  const storiesState = useSelector((state) => state.stories);

  const story = storiesState.singleStoryDetails;

  const commentId = comment?.id;

  /****************** manage state *******************/

  const [commentBody, setComment] = useState(comment.comment);

  const [validationErrors, setValidationErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (story) {
      if (commentBody === undefined) setComment(story.Comments[commentId]);
    }
  }, [dispatch, comment, story, commentBody, commentId]);

  useEffect(() => {
    let errors = [];

    if (commentBody.length < 3 || commentBody.length > 500) {
      errors.push(
        "Please enter a comment that is between 3 and 500 characters"
      );
    }

    setValidationErrors(errors);
  }, [submitted, commentBody]);

  /***************** handle events *******************/

  const updateComment = async (e) => {
    e.preventDefault();
    let updatedComment = {
      comment: commentBody,
    };

    //NEW CODE:
    setSubmitted(true);
    if (validationErrors.length) {
      return;
    }

    await dispatch(
      thunkUpdateSingleComment(updatedComment, comment.id, story.id)
    );
    onClose();
  };

  /**************** render component *****************/

  return (
    <div className="modal-container">
      <p className="modal-title">Edit your comment</p>

      <div className="modal-body">
        <form className="modal-form" onSubmit={updateComment}>
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
              value={commentBody}
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

          <button
            className="modal-button"
            type="submit"
            onClick={updateComment}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentUpdateForm;
