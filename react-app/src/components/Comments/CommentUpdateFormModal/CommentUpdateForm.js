import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkUpdateSingleComment } from "../../../store/storiesReducer";

function CommentUpdateForm({ onClose, comment }) {
  const dispatch = useDispatch();

  const storiesState = useSelector((state) => state.stories);

  const story = storiesState.singleStoryDetails;

  const commentId = comment?.id;

  const [commentBody, setComment] = useState(comment.comment);

  useEffect(() => {
    if (story) {
      if (commentBody === undefined) setComment(story.Comments[commentId]);
    }
  }, [dispatch, comment, story, commentBody, commentId]);

  const updateComment = async (e) => {
    console.log("UPDATE COMMENT ACTIVATED");
    console.log("commentBody:", commentBody);
    console.log("comment.id:", comment.id);
    console.log("story.id:", story.id);

    console.log("updatedComment!!!!!");

    let updatedComment = {
      comment: commentBody,
    };

    e.preventDefault();
    await dispatch(
      thunkUpdateSingleComment(updatedComment, comment.id, story.id)
    );
    onClose();
  };

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
              minLength={2}
              maxLength={500}
              value={commentBody}
            ></textarea>
          </label>
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
