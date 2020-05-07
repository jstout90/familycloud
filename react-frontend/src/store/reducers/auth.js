import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  loginStatus: null,
  currentUser: "",
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    loginStatus: null,
    currentUser: "",
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
    loginStatus: action.loginStatus,
    currentUser: action.currentUser,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    loginStatus: 400,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    loginStatus: null,
    currentUser: "",
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    case actions.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;
