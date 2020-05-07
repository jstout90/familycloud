import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import UserFilesList from "./userFilesAPI/UserFilesList";
import UserFileDetails from "./userFilesAPI/UserFileDetails";
import UserFolderList from "./userFolders/UserFolderList";
import UserFolderDetails from "./userFolders/UserFolderDetails";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/MyFiles/" component={UserFilesList} />
    <Route exact path="/MyFiles/:MyFilesID" component={UserFileDetails} />
    <Route exact path="/MyFolder/" component={UserFolderList} />
    <Route exact path="/MyFolder/:MyFolderID" component={UserFolderDetails} />
  </div>
);
export default BaseRouter;
