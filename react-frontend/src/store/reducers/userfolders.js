import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  userFolders: [],
  selectedFolder: null,
  userFolderDetail: [],
  createUserFolder: [],
  updateUserFolder: [],
  deleteUserFolder: [],
};

const getUserFolderSuccess = (state, action) => {
  return updateObject(state, {
    userFolders: action.payload,
    selectedFolder: null,
    userFolderDetail: [],
    createUserFolder: [],
    updateUserFolder: [],
    deleteUserFolder: [],
  });
};

const getSelectedFolderSuccess = (state, action) => {
  return updateObject(state, {
    selectedFolder: action.payload,
  });
};

const getUserFolderDetailSuccess = (state, action) => {
  return updateObject(state, {
    userFolderDetail: action.payload,
  });
};

const createUserFolderSuccess = (state, action) => {
  return updateObject(state, {
    createUserFolder: action.payload,
  });
};

const updateUserFolderSuccess = (state, action) => {
  return updateObject(state, {
    updateUserFolder: action.payload,
  });
};

const deleteUserFolderSuccess = (state, action) => {
  return updateObject(state, {
    deleteUserFolder: action.payload,
  });
};

const userFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_FOLDERS:
      return getUserFolderSuccess(state, action);
    case actions.GET_SELECTED_FOLDER:
      return getSelectedFolderSuccess(state, action);
    case actions.USER_FOLDER_DETAIL:
      return getUserFolderDetailSuccess(state, action);
    case actions.CREATE_USER_FOLDER:
      return createUserFolderSuccess(state, action);
    case actions.UPDATE_USER_FOLDER:
      return updateUserFolderSuccess(state, action);
    case actions.DELETE_USER_FOLDER:
      return deleteUserFolderSuccess(state, action);

    default:
      return state;
  }
};

export default userFolderReducer;
