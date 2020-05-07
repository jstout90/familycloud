import * as actions from "./actions";
import { history } from "../../history/history";
import axios from "axios";

const apiUrl = "http://10.0.0.24:8000/api/myfiles/";

export const getAllUsersSuccess = (allusers) => {
  return {
    type: actions.GET_ALL_USERS,
    payload: allusers,
  };
};

export const getAllUsers = () => {
  localStorage.removeItem("selectedUser");
  localStorage.removeItem("selectedFolder");
  return (dispatch) => {
    axios
      .get("http://10.0.0.24:8000/api/site-users")
      .then((response) => {
        dispatch(getAllUsersSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSelectedUserSuccess = (selectedUser) => {
  localStorage.setItem("selectedUser", selectedUser);
  return {
    type: actions.GET_SELECTED_USER,
    payload: selectedUser,
  };
};

export const checkForSelectedUser = () => {
  return (dispatch) => {
    const selectedUser = localStorage.getItem("selectedUser");
    if (selectedUser !== null) {
      dispatch(getSelectedUserSuccess(selectedUser));
    }
  };
};

// GET FILES
export const getUserFilesSuccess = (userfiles) => {
  return {
    type: actions.GET_FILES,
    payload: userfiles,
  };
};

export const getUserFiles = () => {
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((response) => {
        dispatch(getUserFilesSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// FILE DETAILS
export const getUserFileDetailSuccess = (userFileDetail) => {
  return {
    type: actions.USER_FILE_DETAIL,
    payload: userFileDetail,
  };
};

export const userFileDetails = (id) => {
  return (dispatch) => {
    axios
      .get(`${apiUrl}${id}/`)
      .then((response) => {
        dispatch(getUserFileDetailSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// CREATE FILE
export const createFileSuccess = (file) => {
  return {
    type: actions.CREATE_USER_FILE,
    payload: file,
  };
};

export const createFile = (file) => {
  return (dispatch) => {
    axios
      .post(`${apiUrl}create/`, file)
      .then((response) => {
        dispatch(createFileSuccess(response.data));
        dispatch(getUserFiles());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// UPDATE FILE
export const updateFileSuccess = (updateFile) => {
  return {
    type: actions.UPDATE_USER_FILE,
    payload: updateFile,
  };
};

export const updateFile = (id, file) => {
  return (dispatch) => {
    axios
      .put(`${apiUrl}${id}/update/`, file)
      .then((response) => {
        dispatch(updateFileSuccess(response.data));
        dispatch(getUserFiles());
        history.push("/MyFiles");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// DELETE FILE
export const deleteFileSuccess = () => {
  return {
    type: actions.DELETE_USER_FILE,
  };
};
export const deleteFile = (id) => {
  return (dispatch) => {
    axios
      .delete(`${apiUrl}${id}/delete/`)
      .then((response) => {
        dispatch(deleteFileSuccess());
        dispatch(getUserFiles());
        history.push("/MyFiles");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
