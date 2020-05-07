import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as folderActions from "../../store/actions/userfolders";
import * as fileActions from "../../store/actions/userfiles";
import UserImages from "../userFilesAPI/UserImages";
import UserVideo from "../userFilesAPI/UserVideo";
import UserMusic from "../userFilesAPI/UserMusic";
import UserDocuments from "../userFilesAPI/UserDocuments";

class UserFolderDetail extends React.Component {
  componentDidMount() {
    this.props.checkSelectedFolder();
    this.props.fetchFiles();
    this.props.checkSelectedUser();
  }

  handleFolderUpdate = (event) => {
    event.preventDefault();
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      Authorization: `Token ${this.props.token}`,
    };
    const preCheck = {
      folder: event.target.elements.folder.value,
      created_by: this.props.currentUser,
    };
    const formData = new FormData();
    formData.append("created_by", preCheck.created_by);
    if (preCheck.folder !== "") {
      formData.append("folder", preCheck.folder);
      this.props.updateFolder(this.props.match.params.MyFolderID, formData);
    } else {
      this.renderError();
    }
  };

  renderError() {
    alert("Please enter folder name.");
  }

  handleDelete = (event) => {
    event.preventDefault();
    const MyFolderID = this.props.match.params.MyFolderID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    this.props.deleteFolder(MyFolderID);
  };

  renderDeleteForm() {
    const loggedIn = this.props.isAuthenticated;
    if (loggedIn !== null) {
      return (
        <div className="ui segment">
          <form
            className="ui form"
            onSubmit={(event) => {
              this.handleFolderUpdate(event);
            }}
          >
            <div className="field">
              <label>
                <input
                  placeholder="Change Folder Name"
                  type="text"
                  name="folder"
                />
              </label>
            </div>
            <div>
              <button className="ui green button" type="submit">
                Update Folder Name
              </button>
              <button
                onClick={this.handleDelete}
                className="ui red button"
                type="submit"
              >
                Delete This Folder?
              </button>
            </div>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui segment">
        <h3>{this.props.selectedFolder}</h3>
        {this.renderDeleteForm()}

        <div className="ui segment">
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
    token: state.auth.token,
    isAuthenticated: state.auth.token,
    currentUser: state.auth.currentUser,
    userfiles: state.userfiles.userfiles,
    selectedUser: state.userfiles.selectedUser,
    selectedFolder: state.userfolders.selectedFolder,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchFiles: () => dispatch(fileActions.getUserFiles()),
    checkSelectedUser: () => dispatch(fileActions.checkForSelectedUser()),
    checkSelectedFolder: () => dispatch(folderActions.checkForSelectedFolder()),
    deleteFolder: (id) => dispatch(folderActions.deleteFolder(id)),
    updateFolder: (id, folder) =>
      dispatch(folderActions.updateFolder(id, folder)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFolderDetail);
