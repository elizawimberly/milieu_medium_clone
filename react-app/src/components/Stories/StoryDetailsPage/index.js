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

// import CommentCreateFormModal from "../../Comments/CommentCreateFormModal";
// import CommentDeleteModal from "../../Comments/CommentDeleteModal";
// import TagCreateFormModal from "../../Tags/TagCreateFormModal";
// import TagDeleteModal from "../../Tags/TagDeleteModal";
// import buddyIcon from "../../../assets/buddyicon.png";
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
    // storystreamButton = (
    //   <NavLink to="/photostream" id="back-to-photostream">
    //     <i className="fa-solid fa-arrow-left-long"></i> Photostream
    //   </NavLink>
    // );
    updateStoryButtons = (
      <>
        <div>
          LOGGED IN
          <NavLink to={`/stories/${storyId}/edit`} id="photo-page-fa-icon">
            <i class="fa-solid fa-pen"></i>
          </NavLink>
        </div>

        <div>
          <i
            class="fa-solid fa-trash"
            id="photo-page-fa-icon"
            onClick={deleteStory}
          ></i>
        </div>
      </>
    );
  }

  /***************** handle events *******************/
  const history = useHistory();

  function deleteStory() {
    dispatch(thunkDeleteSingleStory(storyId));
    history.push("/");
  }

  /**************** render component *****************/
  return (
    <>
      <div className="page-wrapper-container">
        <div id="PhotoDetailsPage-component">
          <div
            className="top-half"
            // style={{
            //   backgroundColor: "#212124",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            //   backgroundSize: "cover",
            // }}
          >
            {/* <div className="top-half-section-A">
              {user?.id === photo?.userId && <div>{photostreamButton}</div>}
            </div> */}

            <div className="top-half-section-B">
              {/* <div>
              <i class="fa-solid fa-chevron-left"></i>
            </div> */}

              {/* <div>
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="view-photo"
                ></img>
              </div> */}

              {/* <div>
              <i class="fa-solid fa-chevron-right"></i>
            </div> */}
            </div>
            {user?.id === story?.userId && (
              <div className="top-half-section-C">
                USER LOGGED IN {updateStoryButtons}
              </div>
            )}
          </div>

          <div className="bottom-half">
            <div className="bottom-half-left">
              <div className="photo-blurb">
                <div className="photo-blurb-profile-pic-container">
                  {/* <img
                  src={buddyIcon}
                  alt="profile"
                  className="photo-blurb-profile-pic"
                ></img> */}
                </div>
                <div className="photo-blurb-about-container">
                  {/* <div className="photo-blurb-photographer">{photo.User.username}</div> */}
                  {firstName && lastName && (
                    <div className="photo-blurb-photographer">
                      {firstName} {lastName}
                    </div>
                  )}
                  <div className="photo-blurb-name">
                    {story && story?.title}
                  </div>
                  <div className="photo-blurb-about">
                    {story && story?.content}
                  </div>
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
                        <div className="comment-text">{comment.comment}</div>
                      </div>
                      <div className="comment-bottom-line-container">
                        <div className="comment-createdAt">
                          {convertDate(comment.createdAt)}
                        </div>
                        {user?.id === comment.User.id ||
                        user?.id === story.userId ? (
                          <CommentDeleteModal comment={comment} />
                        ) : (
                          <></>
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
              </div>

              <div className="add-comment-section">
                LOGGED IN CREATE COMMENT
                {user ? <CommentCreateFormModal /> : <></>}
              </div>
            </div>

            <div className="bottom-half-right">
              <div className="stats-container">
                <div className="comments-stats">
                  <div className="comment-count">{comments?.length}</div>
                  <div className="comment-label">comments</div>
                </div>
                <div className="photo-stats">
                  {/* <div>
                  Uploaded on {photo.createdAt && convertDate(photo.createdAt)}
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <FooterAccount /> */}
    </>
  );
}

export default StoryDetailsPage;
