/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import {
  thunkDeleteSingleStory,
  thunkReadSingleStoryDetails,
} from "../../../store/storiesReducer";
import "./StoryDetailsPage.css";
import { convertDate } from "../../../component-resources";
import CommentCreateFormModal from "../../Comments/CommentCreateFormModal";
import CommentDeleteModal from "../../Comments/CommentDeleteModal";
import CommentUpdateFormModal from "../../Comments/CommentUpdateFormModal";
import defaultPhoto from "../../../assets/placeholder.jpeg";

// import FooterAccount from "../../Footer/FooterAccount";

/******************************* COMPONENT *******************************/
function StoryDetailsPage() {
  /****************** access store *******************/
  const sessionState = useSelector((state) => state.session);
  const storiesState = useSelector((state) => state.stories);

  /************ key into pertinent values ************/
  // user
  const user = sessionState.user;
  // photo
  const story = storiesState.singleStoryDetails;
  // comments
  const storyComments = story.Comments;
  const comments = Object.values(storyComments);
  // params
  const { storyId } = useParams();

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadSingleStoryDetails(storyId));
  }, [dispatch, storyId]);

  /****************** manage state *******************/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /************* conditional components **************/
  useEffect(() => {
    if (story.User) {
      setFirstName(story.User.firstName);
      setLastName(story.User.lastName);
    }
  }, [story.User]);

  let storystreamButton = <></>;
  let updateStoryButtons = (
    <div>
      <div>NOT LOGGED IN</div>
    </div>
  );
  if (user) {
    updateStoryButtons = (
      <>
        <div>
          <button className="modal-button" id="user-button">
            <NavLink to={`/stories/${storyId}/edit`} id="photo-page-fa-icon">
              <div className="details-update-container">
                <div className="details-update-text">Update Your Story</div>
                <i class="fa-solid fa-pen"></i>
              </div>
            </NavLink>
          </button>
        </div>
        <button className="modal-button" id="user-button">
          <div className="details-update-container">
            <div className="details-update-text" onClick={deleteStory}>
              Delete Your Story
              <i
                class="fa-solid fa-trash"
                id="story-page-fa-icon"
                // onClick={deleteStory}
              ></i>
            </div>
          </div>
        </button>
      </>
    );
  }

  /***************** handle events *******************/
  const history = useHistory();

  function deleteStory() {
    let confirmAction = window.confirm("Are you sure to delete your story?");
    if (confirmAction) {
      alert("Your story has successfully been deleted");
      dispatch(thunkDeleteSingleStory(storyId));
      history.push("/");
    } else {
      alert("Delete canceled");
    }
  }

  /**************** render component *****************/
  return (
    <>
      <div className="page-wrapper-container">
        <div id="PhotoDetailsPage-component">
          <div className="top-half">
            <div className="top-half-section-B">
              <div>
                <img
                  src={story.image}
                  // src={defaultPhoto}
                  alt={story.title}
                  className="view-photo"
                  // onError={(e) =>
                  //   (e.currentTarget.src =
                  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png")
                  // }
                  onError={(e) => (e.currentTarget.src = defaultPhoto)}
                ></img>
              </div>
            </div>
            {user?.id === story?.userId && (
              <div className="top-half-section-C">{updateStoryButtons}</div>
            )}
          </div>

          <div className="bottom-half">
            <div className="bottom-half-inner">
              <div className="story-blurb">
                <div className="story-blurb-title">{story && story?.title}</div>
                {/* <div className="photo-blurb-photographer">{photo.User.username}</div> */}
                {firstName && lastName && (
                  <div className="story-blurb-outer">
                    <div className="story-blurb-author">
                      {`Written by ${firstName} ${lastName}`}
                      {/* {firstName} {lastName} */}
                    </div>
                    <div className="photo-stats">
                      <div>
                        Uploaded on{" "}
                        {story.createdAt && convertDate(story.createdAt)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="story-blurb-content">
                  {story && story?.content}
                </div>
              </div>

              <div className="comments-section">
                {comments &&
                  comments.map((comment) => (
                    <div
                      className="display-comment"
                      // onMouseEnter={() => setIsShown(true)}
                      // onMouseLeave={() => setIsShown(false)}
                    >
                      <div className="comment-text-container">
                        <div className="comment-text" id="comment-text-user">
                          {`${comment.User.firstName} ${comment.User.lastName} says`}
                        </div>
                        <div className="comment-text">{comment.comment}</div>
                        <div className="comment-createdAt">
                          {convertDate(comment.createdAt)}
                        </div>
                      </div>
                      <div className="comment-bottom-line-container">
                        {/* <div className="comment-createdAt">
                          {convertDate(comment.createdAt)}
                        </div> */}
                        {user?.id === comment.User.id ||
                        user?.id === story.userId ? (
                          <>
                            <CommentDeleteModal comment={comment} />
                          </>
                        ) : (
                          <></>
                        )}
                        {user?.id === comment.User.id && (
                          <CommentUpdateFormModal comment={comment} />
                        )}
                      </div>
                    </div>
                  ))}
                <br />
                <div>
                  {!user && (
                    <div>You must be logged in to leave a comment.</div>
                  )}
                </div>

                {/* add divs here */}
                <div className="add-comment-section">
                  {user ? <CommentCreateFormModal /> : <></>}
                </div>
              </div>

              {/* <div className="bottom-half-right">
                <div className="stats-container">
                  <div className="comments-stats">
                    <div className="comment-count">{comments?.length}</div>
                    <div className="comment-label">comments</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <FooterAccount /> */}
    </>
  );
}

export default StoryDetailsPage;
