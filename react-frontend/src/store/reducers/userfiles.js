import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  userlist: [],
  selectedUser: "",
  userfiles: [],
  userFileDetail: [],
  createUserFile: [],
  updateUserFile: [],
  deleteUserFile: [],
};

const getAllUsers = (state, action) => {
  return updateObject(state, {
    userlist: action.payload,
  });
};

const getSelectedUserSuccess = (state, action) => {
  return updateObject(state, {
    selectedUser: action.payload,
  });
};

const getUserFilesSuccess = (state, action) => {
  return updateObject(state, {
    userfiles: action.payload,
    userFileDetail: [],
    createUserFile: [],
    updateUserFile: [],
    deleteUserFile: [],
  });
};

const getUserFileDetailSuccess = (state, action) => {
  return updateObject(state, {
    userFileDetail: action.payload,
  });
};

const createUserFileSuccess = (state, action) => {
  return updateObject(state, {
    createUserFile: action.payload,
  });
};

const updateUserFileSuccess = (state, action) => {
  return updateObject(state, {
    updateUserFile: action.payload,
  });
};

const deleteUserFileSuccess = (state, action) => {
  return updateObject(state, {
    deleteUserFile: action.payload,
  });
};

const userFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return getAllUsers(state, action);
    case actions.GET_SELECTED_USER:
      return getSelectedUserSuccess(state, action);
    case actions.GET_FILES:
      return getUserFilesSuccess(state, action);
    case actions.USER_FILE_DETAIL:
      return getUserFileDetailSuccess(state, action);
    case actions.CREATE_USER_FILE:
      return createUserFileSuccess(state, action);
    case actions.UPDATE_USER_FILE:
      return updateUserFileSuccess(state, action);
    case actions.DELETE_USER_FILE:
      return deleteUserFileSuccess(state, action);

    default:
      return state;
  }
};

export default userFilesReducer;
