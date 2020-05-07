import * as actions from "./actions";
import { history } from "../../history/history";
import axios from "axios";

const folderUrl = "http://10.0.0.24:8000/api/user-folders";

export const getSelectedFolderSuccess = (selectedFolder) => {
  localStorage.setItem("selectedFolder", selectedFolder);
  return {
    type: actions.GET_SELECTED_FOLDER,
    payload: selectedFolder,
  };
};

export const checkForSelectedFolder = () => {
  return (dispatch) => {
    const selectedFolder = localStorage.getItem("selectedFolder");
    if (selectedFolder !== null) {
      dispatch(getSelectedFolderSuccess(selectedFolder));
    }
  };
};

// GET FOLDER
export const getUserFolderSuccess = (userfolder) => {
  return {
    type: actions.GET_FOLDERS,
    payload: userfolder,
  };
};

export const getUserFolder = () => {
  return (dispatch) => {
    axios
      .get(folderUrl)
      .then((response) => {
        dispatch(getUserFolderSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// FOLDER DETAILS
export const getUserFolderDetailSuccess = (userFolderDetail) => {
  return {
    type: actions.USER_FOLDER_DETAIL,
    payload: userFolderDetail,
  };
};

export const userFolderDetails = (id) => {
  return (dispatch) => {
    axios
      .get(`${folderUrl}/${id}/`)
      .then((response) => {
        dispatch(getUserFolderDetailSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// CREATE FOLDER
export const createFolderSuccess = (folder) => {
  return {
    type: actions.CREATE_USER_FOLDER,
    payload: folder,
  };
};

export const createFolder = (folder) => {
  console.log(folder);
  return (dispatch) => {
    axios
      .post(`${folderUrl}/create/`, folder)
      .then((response) => {
        dispatch(createFolderSuccess(response.data));
        dispatch(getUserFolder());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// UPDATE FOLDER
export const updateFolderSuccess = (updateFolder) => {
  return {
    type: actions.UPDATE_USER_FOLDER,
    payload: updateFolder,
  };
};

export const updateFolder = (id, folder) => {
  return (dispatch) => {
    axios
      .put(`${folderUrl}/${id}/update/`, folder)
      .then((response) => {
        dispatch(updateFolderSuccess(response.data));
        dispatch(getUserFolder());
        history.push("/MyFiles");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// DELETE FOLDER
export const deleteFolderSuccess = () => {
  return {
    type: actions.DELETE_USER_FOLDER,
  };
};
export const deleteFolder = (id) => {
  return (dispatch) => {
    axios
      .delete(`${folderUrl}/${id}/delete/`)
      .then((response) => {
        dispatch(deleteFolderSuccess());
        dispatch(getUserFolder());
        history.push("/MyFiles");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
