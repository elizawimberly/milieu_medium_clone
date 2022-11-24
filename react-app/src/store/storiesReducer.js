/******************************** IMPORTS ********************************/
// local files
import { normalizeArray } from "../component-resources/index";

/********************************* TYPES *********************************/
// photos
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

export const actionUpdateSingleStory = (updatePhoto) => ({
  type: STORIES_UPDATE_SINGLE_STORY,
  payload: updatePhoto,
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
  const response = await fetch(`/api/stories/`);
  if (response.ok) {
    const allStories = await response.json();
    dispatch(actionReadAllStories(allStories.Stories));
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
    const response = await fetch(`/api/photos/${storyId}`, {
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
  const response = await fetch(`/api/photos/${storyId}`, {
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
//current refactored
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

export const thunkDeleteSingleComment =
  (photoId, commentId) => async (dispatch) => {
    const response = await fetch(
      `/api/photos/${photoId}/comments/${commentId}`,
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
const initialState = {
  allPhotos: {},
  userPhotos: {},
  singlePhotoDetails: {
    Comments: {},
    Tags: {},
  },
};

/******************************* REDUCER *********************************/
const photosReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    // photos
    case PHOTOS_CREATE_SINGLE_PHOTO:
      newState.allPhotos = { ...state.allPhotos };
      // add new photo to normalized object of all photos
      newState.allPhotos[action.payload.id] = { ...action.payload };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...action.payload };
      // deep copy nested structures
      newState.singlePhotoDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      newState.singlePhotoDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    case PHOTOS_READ_ALL_PHOTOS:
      newState.allPhotos = { ...state.allPhotos };
      newState.allPhotos = normalizeArray(action.payload);
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotos_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let readAllPhotos_NewCopyCommentsObj = normalizeArray(
        readAllPhotos_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments = readAllPhotos_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotos_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let readAllPhotos_NewCopyTagsObj = normalizeArray(
        readAllPhotos_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = readAllPhotos_NewCopyTagsObj;
      return newState;

    case PHOTOS_READ_ALL_PHOTOS_BY_USER:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.userPhotos = normalizeArray(action.payload);
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotosByUser_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let readAllPhotosByUser_NewCopyCommentsObj = normalizeArray(
        readAllPhotosByUser_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments =
        readAllPhotosByUser_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotosByUser_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let readAllPhotosByUser_NewCopyTagsObj = normalizeArray(
        readAllPhotosByUser_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = readAllPhotosByUser_NewCopyTagsObj;
      return newState;

    case PHOTOS_READ_SINGLE_PHOTO_DETAILS:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...action.payload };
      // deep copy nested structures
      newState.singlePhotoDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      newState.singlePhotoDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    case PHOTOS_UPDATE_SINGLE_PHOTO:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...action.payload };
      // deep copy nested structures
      newState.singlePhotoDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      newState.singlePhotoDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    case PHOTOS_DELETE_SINGLE_PHOTO:
      newState.allPhotos = { ...state.allPhotos };
      // remove photo
      delete newState.allPhotos[action.payload.id];
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let deleteSinglePhoto_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let deleteSinglePhoto_NewCopyCommentsObj = normalizeArray(
        deleteSinglePhoto_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments =
        deleteSinglePhoto_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Comments
      let deleteSinglePhoto_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let deleteSinglePhoto_NewCopyTagsObj = normalizeArray(
        deleteSinglePhoto_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = deleteSinglePhoto_NewCopyTagsObj;
      return newState;

    // tags
    case PHOTOS_CREATE_SINGLE_TAG:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structure: singlePhotoDetails.Comments
      let createSingleTag_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let createSingleTag_NewCopyCommentsObj = normalizeArray(
        createSingleTag_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments = createSingleTag_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Tags
      let createSingleTag_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let createSingleTag_NewCopyTagsObj = normalizeArray(
        createSingleTag_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = createSingleTag_NewCopyTagsObj;
      // add new tag
      action.payload.forEach((tag) => {
        newState.singlePhotoDetails.Tags[tag.id] = tag;
      });
      return newState;

    case PHOTOS_DELETE_SINGLE_TAG:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structure: singlePhotoDetails.Comments
      let deleteSingleTag_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let deleteSingleTag_NewCopyCommentsObj = normalizeArray(
        deleteSingleTag_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments = deleteSingleTag_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Tags
      let deleteSingleTag_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let deleteSingleTag_NewCopyTagsObj = normalizeArray(
        deleteSingleTag_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = deleteSingleTag_NewCopyTagsObj;
      // remove tag
      delete newState.singlePhotoDetails.Tags[action.payload];
      return newState;

    // comments
    case PHOTOS_CREATE_SINGLE_COMMENT:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let createSingleComment_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let createSingleComment_NewCopyCommentsObj = normalizeArray(
        createSingleComment_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments =
        createSingleComment_NewCopyCommentsObj;
      // add new comment
      newState.singlePhotoDetails.Comments[action.payload.id] = {
        ...action.payload,
      };
      // deep copy nested structure: singlePhotoDetails.Tags
      let createSingleComment_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let createSingleComment_NewCopyTagsObj = normalizeArray(
        createSingleComment_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = createSingleComment_NewCopyTagsObj;
      return newState;

    case PHOTOS_DELETE_SINGLE_COMMENT:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structure: singlePhotoDetails.Comments
      let deleteSingleComment_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let deleteSingleComment_NewCopyCommentsObj = normalizeArray(
        deleteSingleComment_RevertCommentsArr
      );
      // delete deleteSingleComment_NewCopyCommentsObj[action.payload.id];
      newState.singlePhotoDetails.Comments =
        deleteSingleComment_NewCopyCommentsObj;
      // remove comment
      delete newState.singlePhotoDetails.Comments[action.payload];
      // deep copy nested structures: singlePhotoDetails.Tags
      let deleteSingleComment_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let deleteSingleComment_NewCopyTagsObj = normalizeArray(
        deleteSingleComment_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = deleteSingleComment_NewCopyTagsObj;
      return newState;

    default:
      return state;
  }
};

/******************************** EXPORTS ********************************/
export default photosReducer;
