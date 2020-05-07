import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as fileActions from "../../store/actions/userfiles";
import * as authActions from "../../store/actions/auth";

class UserFileForm extends React.Component {
  componentDidMount() {
    this.props.checkLoginStatus();
  }

  handleFormSubmit = (event, requestType, MyFilesID) => {
    event.preventDefault();
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      Authorization: `Token ${this.props.token}`,
    };
    const preCheck = {
      title: event.target.elements.title.value,
      file: event.target.elements.file.files[0],
      folder: event.target.elements.folder.value,
      user: this.props.currentUser,
    };
    const formData = new FormData();
    formData.append("user", preCheck.user);
    if (requestType === "post") {
      if (preCheck.title === "" || preCheck.file === undefined) {
        this.renderError();
      } else {
        formData.append("title", preCheck.title);
        formData.append("file", preCheck.file, preCheck.file.name);
        formData.append("folder", preCheck.folder);
        this.props.createFile(formData);
      }
    } else if (requestType === "put") {
      if (preCheck.title === "" || preCheck.file === undefined) {
        this.renderError();
      } else {
        formData.append("title", preCheck.title);
        formData.append("file", preCheck.file, preCheck.file.name);
        formData.append("folder", preCheck.folder);
        this.props.updateFile(this.props.MyFilesID, formData);
      }
    }
  };

  renderError() {
    alert("Please enter title and file.");
  }

  folderList() {
    const userfolders = this.props.userFolders;
    const currentUser = this.props.currentUser;
    return userfolders
      .filter((user) => user.created_by === currentUser)
      .map((userFolders) => {
        const myFolder = [userfolders];
        return myFolder.map((folder) => {
          return (
            <option key={userFolders.id} value={userFolders.folder}>
              {userFolders.folder}
            </option>
          );
        });
      });
  }

  render() {
    return (
      <div>
        <form
          className="ui form"
          onSubmit={(event) =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.MyFilesID
            )
          }
        >
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <h4>File Title</h4>
                <label>
                  <input
                    className="ui input"
                    type="text"
                    name="title"
                    placeholder="Enter Title Here"
                  />
                </label>
              </div>

              <div className="field">
                <h4>Select A File</h4>
                <label>
                  <input type="file" name="file" />
                </label>
              </div>
              <div className="field">
                <h4>Select A Folder</h4>
                <label>
                  <select name="folder">
                    <option value="">Folder List</option>
                    {this.folderList()}
                  </select>
                </label>
              </div>
            </div>
          </div>
          <button className="ui green button" type="submit">
            {this.props.btnText}
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    currentUser: state.auth.currentUser,
    userFolders: state.userfolders.userFolders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createFile: (file) => dispatch(fileActions.createFile(file)),
    updateFile: (id, file) => dispatch(fileActions.updateFile(id, file)),
    checkLoginStatus: () => dispatch(authActions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFileForm);
