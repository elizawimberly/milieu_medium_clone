/******************************** IMPORTS ********************************/
// local files
import { normalizeArray } from "../component-resources/index";

/********************************* TYPES *********************************/
// stories
const STORIES_CREATE_SINGLE_STORY = "stories/CREATE_SINGLE_STORY";
const STORIES_READ_ALL_STORIES = "stories/READ_ALL_STORIES";
const STORIES_READ_ALL_STORIES_BY_USER = "stories/READ_ALL_STORIES_BY_USER";
const STORIES_READ_SINGLE_STORY_DETAILS = "stories/READ_SINGLE_STORY_DETAILS";
const STORIES_UPDATE_SINGLE_STORY = "stories/UPDATE_SINGLE_STORY";
const STORIES_DELETE_SINGLE_STORY = "stories/DELETE_SINGLE_STORY";
// tags
// const STORIES_CREATE_SINGLE_TAG = "stories/CREATE_SINGLE_TAG";
// const STORIES_DELETE_SINGLE_TAG = "stories/DELETE_SINGLE_TAG";
// comments
const STORIES_CREATE_SINGLE_COMMENT = "stories/CREATE_SINGLE_COMMENT";
const STORIES_UPDATE_SINGLE_COMMENT = "stories/UPDATE_SINGLE_COMMENT";
const STORIES_DELETE_SINGLE_COMMENT = "stories/DELETE_SINGLE_COMMENT";

/**************************** ACTION CREATORS ****************************/

/**************************** STORIES ************************************/

export const actionCreateSingleStory = (newStory) => ({
  type: STORIES_CREATE_SINGLE_STORY,
  payload: newStory,
});

export const actionReadAllStories = (allStories) => ({
  type: STORIES_READ_ALL_STORIES,
  payload: allStories,
});

export const actionReadAllStoriesByUser = (userStories) => ({
  type: STORIES_READ_ALL_STORIES_BY_USER,
  payload: userStories,
});

export const actionReadSingleStoryDetails = (singleStoryDetails) => ({
  type: STORIES_READ_SINGLE_STORY_DETAILS,
  payload: singleStoryDetails,
});

export const actionUpdateSingleStory = (updateStory) => ({
  type: STORIES_UPDATE_SINGLE_STORY,
  payload: updateStory,
});

export const actionDeleteSingleStory = (storyId) => ({
  type: STORIES_DELETE_SINGLE_STORY,
  payload: storyId,
});

/**************************** TAGS ************************************/

// tags
// export const actionCreateSingleTag = (newTag) => ({
//   type: STORIES_CREATE_SINGLE_TAG,
//   payload: newTag,
// });

// export const actionDeleteSingleTag = (tagId) => ({
//   type: STORIES_DELETE_SINGLE_TAG,
//   payload: tagId,
// });

/**************************** COMMENTS ************************************/

export const actionCreateSingleComment = (newComment) => ({
  type: STORIES_CREATE_SINGLE_COMMENT,
  payload: newComment,
});

export const actionDeleteSingleComment = (commentId) => ({
  type: STORIES_DELETE_SINGLE_COMMENT,
  payload: commentId,
});

export const actionUpdateSingleComment = (updateComment) => ({
  type: STORIES_UPDATE_SINGLE_COMMENT,
  payload: updateComment,
});

/********************* THUNKS (API) *************************/

/********************* STORIES THUNKS ***********************/

//refactored
// export const thunkCreateSingleStory =
//   (name, about, url, takenOn, privateVar, tags, albumId) =>
export const thunkCreateSingleStory = (newStory) => async (dispatch) => {
  const response = await fetch(`/api/stories/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({
    //   name,
    //   about,
    //   url,
    //   takenOn,
    //   private: privateVar,
    //   tags,
    // }),
    // instead of sending individual keys from flickr clone, I have refactored to send the newStory obj:
    body: JSON.stringify(newStory),
  });
  if (response.ok) {
    const storyResponse = await response.json();
    dispatch(actionCreateSingleStory(storyResponse));
    return storyResponse;
  }
};

//refactored
export const thunkReadAllStories = () => async (dispatch) => {
  console.log("HIT thunkReadAllStories THUNK");
  const response = await fetch(`/api/stories/`);
  if (response.ok) {
    const allStories = await response.json();
    dispatch(actionReadAllStories(allStories.stories));
    return allStories;
  }
};

//refactored
export const thunkReadAllStoriesByUser = () => async (dispatch) => {
  const response = await fetch(`/api/stories/current`);
  if (response.ok) {
    const userStories = await response.json();
    dispatch(actionReadAllStoriesByUser(userStories.Stories));
    return userStories;
  }
};

//refactored
export const thunkReadSingleStoryDetails = (storyId) => async (dispatch) => {
  const response = await fetch(`/api/stories/${storyId}`);
  if (response.ok) {
    const singleStoryDetails = await response.json();
    dispatch(actionReadSingleStoryDetails(singleStoryDetails));
    return singleStoryDetails;
  }
};

// ************* ORIGINAL UPDATE STORY *************
// export const thunkUpdateSinglePhoto =
//   (photoId, name, about, url, takenOn, privateVar, albumId) => async (dispatch) => {
//     const response = await fetch(`/api/photos/${photoId}`, {
//       method: "put",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         about,
//         url,
//         takenOn,
//         private: privateVar,
//         albumId
//       }),
//     });
//     if (response.ok) {
//       const updatePhoto = await response.json();
//       dispatch(actionUpdateSinglePhoto(updatePhoto));
//       return updatePhoto;
//     }
//   };

//refactored --- see commented out code above for notes
export const thunkUpdateSingleStory =
  (updatedStory, storyId) => async (dispatch) => {
    const response = await fetch(`/api/stories/${storyId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStory),
    });
    if (response.ok) {
      const updateStory = await response.json();
      dispatch(actionUpdateSingleStory(updateStory));
      return updateStory;
    }
  };

//refactored
export const thunkDeleteSingleStory = (storyId) => async (dispatch) => {
  const response = await fetch(`/api/stories/${storyId}`, {
    method: "delete",
  });
  if (response.ok) {
    dispatch(actionDeleteSingleStory(storyId));
    return;
  }
};

// tags
// export const thunkCreateSingleTag =
//   (photoId, createTagData) => async (dispatch) => {
//     const response = await fetch(`/api/photos/${photoId}/tags`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tags: createTagData }),
//     });
//     if (response.ok) {
//       const newTags = await response.json();
//       dispatch(actionCreateSingleTag(newTags.Tags));
//       return newTags;
//     }
//   };

// export const thunkDeleteSingleTag = (photoId, tagId) => async (dispatch) => {
//   const response = await fetch(`/api/photos/${photoId}/tags/${tagId}`, {
//     method: "delete",
//   });
//   if (response.ok) {
//     dispatch(actionDeleteSingleTag(tagId));
//     return;
//   }
// };

/********************* COMMENTS THUNKS **************************/
//refactored
export const thunkCreateSingleComment =
  (storyId, createCommentData) => async (dispatch) => {
    const response = await fetch(`/api/stories/${storyId}/comments`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: createCommentData }),
    });
    if (response.ok) {
      const newComment = await response.json();
      dispatch(actionCreateSingleComment(newComment));
      return newComment;
    }
  };

//new
export const thunkUpdateSingleComment =
  (updatedComment, commentId, storyId) => async (dispatch) => {
    console.log("hit update thunk");
    console.log("updatedComment", updatedComment);
    const response = await fetch(
      `/api/stories/${storyId}/comments/${commentId}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedComment),
      }
    );
    if (response.ok) {
      const updateComment = await response.json();
      // console.log("updateComment:", updateComment);
      dispatch(actionUpdateSingleComment(updateComment));
      return updateComment;
    }
  };

//refactored
export const thunkDeleteSingleComment =
  (storyId, commentId) => async (dispatch) => {
    const response = await fetch(
      `/api/stories/${storyId}/comments/${commentId}`,
      {
        method: "delete",
      }
    );
    if (response.ok) {
      dispatch(actionDeleteSingleComment(commentId));
      return;
    }
  };

/***************************** STATE SHAPE *******************************/
//refactored
const initialState = {
  allStories: {},
  userStories: {},
  singleStoryDetails: {
    Comments: {},
  },
};

/******************************* REDUCER *********************************/
const storiesReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    // stories
    //refactored
    /************************************************************/
    case STORIES_CREATE_SINGLE_STORY:
      newState.allStories = { ...state.allStories };
      // add new story to normalized object of all stories
      newState.allStories[action.payload.id] = { ...action.payload };
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...action.payload };
      // deep copy nested structures
      newState.singleStoryDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      return newState;

    //refactored
    /**********************************************************/
    case STORIES_READ_ALL_STORIES:
      newState.allStories = { ...state.allStories };
      newState.allStories = normalizeArray(action.payload);
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...state.singleStoryDetails };
      // deep copy nested structures: singleStoryDetails.Comments
      let readAllStories_RevertCommentsArr = Object.values(
        newState.singleStoryDetails.Comments
      );
      let readAllStories_NewCopyCommentsObj = normalizeArray(
        readAllStories_RevertCommentsArr
      );
      newState.singleStoryDetails.Comments = readAllStories_NewCopyCommentsObj;
      // deep copy nested structures: singleStoryDetails.Tags
      // let readAllStories_RevertTagsArr = Object.values(
      //   newState.singleStoryDetails.Tags
      // );
      // let readAllStories_NewCopyTagsObj = normalizeArray(
      //   readAllStories_RevertTagsArr
      // );
      // newState.singleStoryDetails.Tags = readAllStories_NewCopyTagsObj;
      return newState;

    //refactored
    /************************************************************/
    case STORIES_READ_ALL_STORIES_BY_USER:
      newState.allStories = { ...state.allStories };
      newState.userStories = { ...state.userStories };
      newState.userStories = normalizeArray(action.payload);
      newState.singleStoryDetails = { ...state.singleStoryDetails };
      // deep copy nested structures: singleStoryDetails.Comments
      let readAllStoriesByUser_RevertCommentsArr = Object.values(
        newState.singleStoryDetails.Comments
      );
      let readAllStoriesByUser_NewCopyCommentsObj = normalizeArray(
        readAllStoriesByUser_RevertCommentsArr
      );
      newState.singleStoryDetails.Comments =
        readAllStoriesByUser_NewCopyCommentsObj;
      // deep copy nested structures: singleStoryDetails.Tags
      // let readAllStoriesByUser_RevertTagsArr = Object.values(
      //   newState.singleStoryDetails.Tags
      // );
      // let readAllStoriesByUser_NewCopyTagsObj = normalizeArray(
      //   readAllStoriesByUser_RevertTagsArr
      // );
      // newState.singleStoryDetails.Tags = readAllStoriesByUser_NewCopyTagsObj;
      return newState;

    //refactored
    /**********************************************************/
    case STORIES_READ_SINGLE_STORY_DETAILS:
      newState.allStories = { ...state.allStories };
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...action.payload };
      // deep copy nested structures
      newState.singleStoryDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      // newState.singleStoryDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    //refactored
    /*********************************************************/
    case STORIES_UPDATE_SINGLE_STORY:
      newState.allStories = { ...state.allStories };
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...action.payload };
      // deep copy nested structures
      newState.singleStoryDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      // newState.singleStoryDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    //refactored
    /*********************************************************/
    case STORIES_DELETE_SINGLE_STORY:
      newState.allStories = { ...state.allStories };
      // remove story
      delete newState.allStories[action.payload.id];
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...state.singleStoryDetails };
      // deep copy nested structures: singleStoryDetails.Comments
      let deleteSingleStory_RevertCommentsArr = Object.values(
        newState.singleStoryDetails.Comments
      );
      let deleteSingleStory_NewCopyCommentsObj = normalizeArray(
        deleteSingleStory_RevertCommentsArr
      );
      newState.singleStoryDetails.Comments =
        deleteSingleStory_NewCopyCommentsObj;
      // deep copy nested structures: singleStoryDetails.Tags
      // let deleteSingleStory_RevertTagsArr = Object.values(
      //   newState.singleStoryDetails.Tags
      // );
      // let deleteSingleStory_NewCopyTagsObj = normalizeArray(
      //   deleteSingleStory_RevertTagsArr
      // );
      // newState.singleStoryDetails.Tags = deleteSingleStory_NewCopyTagsObj;
      return newState;

    // comments
    //refactored
    /*********************************************************/
    case STORIES_CREATE_SINGLE_COMMENT:
      newState.allStories = { ...state.allStories };
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...state.singleStoryDetails };
      // deep copy nested structures: singleStoryDetails.Comments
      let createSingleComment_RevertCommentsArr = Object.values(
        newState.singleStoryDetails.Comments
      );
      let createSingleComment_NewCopyCommentsObj = normalizeArray(
        createSingleComment_RevertCommentsArr
      );
      newState.singleStoryDetails.Comments =
        createSingleComment_NewCopyCommentsObj;
      // add new comment
      newState.singleStoryDetails.Comments[action.payload.id] = {
        ...action.payload,
      };
      // deep copy nested structure: singleStoryDetails.Tags
      // let createSingleComment_RevertTagsArr = Object.values(
      //   newState.singleStoryDetails.Tags
      // );
      // let createSingleComment_NewCopyTagsObj = normalizeArray(
      //   createSingleComment_RevertTagsArr
      // );
      // newState.singleStoryDetails.Tags = createSingleComment_NewCopyTagsObj;
      return newState;

    //new
    /*********************************************************/
    case STORIES_UPDATE_SINGLE_COMMENT:
      newState.allStories = { ...state.allStories };
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...state.singleStoryDetails };
      // deep copy nested structures: singleStoryDetails.Comments
      let updateSingleComment_RevertCommentsArr = Object.values(
        newState.singleStoryDetails.Comments
      );
      let updateSingleComment_NewCopyCommentsObj = normalizeArray(
        updateSingleComment_RevertCommentsArr
      );
      newState.singleStoryDetails.Comments =
        updateSingleComment_NewCopyCommentsObj;
      // add new comment
      newState.singleStoryDetails.Comments[action.payload.id] = {
        ...action.payload,
      };
      // deep copy nested structure: singleStoryDetails.Tags
      // let updateSingleComment_RevertTagsArr = Object.values(
      //   newState.singleStoryDetails.Tags
      // );
      // let updateSingleComment_NewCopyTagsObj = normalizeArray(
      //   updateSingleComment_RevertTagsArr
      // );
      // newState.singleStoryDetails.Tags = updateSingleComment_NewCopyTagsObj;
      return newState;

    //refactored
    /*********************************************************/
    case STORIES_DELETE_SINGLE_COMMENT:
      newState.allStories = { ...state.allStories };
      newState.userStories = { ...state.userStories };
      newState.singleStoryDetails = { ...state.singleStoryDetails };
      // deep copy nested structure: singleStoryDetails.Comments
      let deleteSingleComment_RevertCommentsArr = Object.values(
        newState.singleStoryDetails.Comments
      );
      let deleteSingleComment_NewCopyCommentsObj = normalizeArray(
        deleteSingleComment_RevertCommentsArr
      );
      // delete deleteSingleComment_NewCopyCommentsObj[action.payload.id];
      newState.singleStoryDetails.Comments =
        deleteSingleComment_NewCopyCommentsObj;
      // remove comment
      delete newState.singleStoryDetails.Comments[action.payload];
      // deep copy nested structures: singleStoryDetails.Tags
      // let deleteSingleComment_RevertTagsArr = Object.values(
      //   newState.singleStoryDetails.Tags
      // );
      // let deleteSingleComment_NewCopyTagsObj = normalizeArray(
      //   deleteSingleComment_RevertTagsArr
      // );
      // newState.singleStoryDetails.Tags = deleteSingleComment_NewCopyTagsObj;
      return newState;

    default:
      return state;
  }
};

/******************************** EXPORTS ********************************/
export default storiesReducer;
