import React from "react";
import { connect } from "react-redux";
import * as folderActions from "../../store/actions/userfolders";
import * as fileActions from "../../store/actions/userfiles";
import * as authActions from "../../store/actions/auth";
import UserFolderList from "../userFolders/UserFolderList";
import UserFolderForm from "../userFolders/UserFolderForm";
import UserFileForm from "./UserFileForm";
import UserImages from "./UserImages";
import UserDocuments from "./UserDocuments";
import UserMusic from "./UserMusic";
import UserVideo from "./UserVideo";

class UserFilesList extends React.Component {
  componentDidMount() {
    this.props.fetchFolders();
    this.props.fetchFiles();
    this.props.checkLoginStatus();
    this.props.checkSelectedUser();
    this.props.checkSelectedFolder();
  }

  // file upload
  renderUploadForm() {
    const loggedIn = this.props.isAuthenticated;
    if (loggedIn !== null) {
      return (
        <UserFileForm
          requestType="post"
          MyFilesID={null}
          btnText="Upload File"
          {...this.props}
        />
      );
    }
  }

  // create folder
  renderFolderCreateForm() {
    const loggedIn = this.props.isAuthenticated;
    if (loggedIn !== null) {
      return (
        <UserFolderForm
          requestType="post"
          MyFilesID={null}
          btnText="Create Folder"
        />
      );
    }
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui stackable grid">
          <div className="eleven wide column">{this.renderUploadForm()}</div>
          <div className="five wide column">
            {this.renderFolderCreateForm()}
          </div>
        </div>
        <div className="ui segment">
          <h1>
            <center>{this.props.selectedUser}'s Folder's</center>
          </h1>
          <UserFolderList {...this.props} />
        </div>
        <div className="ui segment">
          <h1>
            <center>Files With No Folder</center>
          </h1>
          <div className="ui stackable four column divided grid">
            <div className="column">
              <center>
                <h1>Images</h1>
              </center>
              <UserImages {...this.props} />
            </div>
            <div className="column">
              <center>
                <h1>Videos</h1>
              </center>
              <UserVideo {...this.props} />
            </div>
            <div className="column">
              <center>
                <h1>Music</h1>
              </center>
              <UserMusic {...this.props} />
            </div>
            <div className="column">
              <center>
                <h1>Documents</h1>
              </center>
              <UserDocuments {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userfiles: state.userfiles.userfiles,
    userfolders: state.userfolders.userFolders,
    isAuthenticated: state.auth.token,
    currentUser: state.auth.currentUser,
    selectedUser: state.userfiles.selectedUser,
    selectedFolder: state.userfolders.selectedFolder,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolders: () => dispatch(folderActions.getUserFolder()),
    fetchFiles: () => dispatch(fileActions.getUserFiles()),
    checkLoginStatus: () => dispatch(authActions.authCheckState()),
    checkSelectedUser: () => dispatch(fileActions.checkForSelectedUser()),
    checkSelectedFolder: () => dispatch(folderActions.checkForSelectedFolder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFilesList);
