import { combineReducers } from "redux";
import authReducer from "./auth";
import userFilesReducer from "./userfiles";
import userFolderReducer from "./userfolders";

const allReducer = combineReducers({
  auth: authReducer,
  userfiles: userFilesReducer,
  userfolders: userFolderReducer,
});
export default allReducer;
