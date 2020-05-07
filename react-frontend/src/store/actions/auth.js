import * as actions from "./actions";
import axios from "axios";
import { history } from "../../history/history";

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token, loginStatus, currentUser) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    loginStatus: loginStatus,
    currentUser: currentUser,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
    loginStatus: 400,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("status");
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://10.0.0.24:8000/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const myData = JSON.parse(res.config.data);
        const currentUser = myData["username"];
        const token = res.data.key;
        const status = res.status;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("currentUser", currentUser);
        localStorage.setItem("status", status);
        dispatch(authSuccess(token, status, currentUser));
        dispatch(checkAuthTimeout(3600));
        history.push("/");
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://10.0.0.24:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const myData = JSON.parse(res.config.data);
        const currentUser = myData["username"];
        const status = res.status;
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("currentUser", currentUser);
        localStorage.setItem("status", status);
        dispatch(authSuccess(token, status, currentUser));
        dispatch(checkAuthTimeout(3600));
        history.push("/");
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const currentUser = localStorage.getItem("currentUser");
        const status = localStorage.getItem("status");
        dispatch(authSuccess(token, status, currentUser));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
