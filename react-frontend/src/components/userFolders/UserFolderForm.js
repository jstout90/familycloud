import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as authActions from "../../store/actions/auth";
import * as folderActions from "../../store/actions/userfolders";

class UserFolderForm extends React.Component {
  componentDidMount() {
    this.props.checkLoginStatus();
  }

  handleFormSubmit = async (event, requestType, MyFilesID) => {
    event.preventDefault();
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      Authorization: `Token ${this.props.token}`,
    };
    const preCheck = {
      folder: event.target.elements.folderName.value,
      created_by: this.props.currentUser,
    };
    const formData = new FormData();
    formData.append("created_by", preCheck.created_by);
    if (requestType === "post") {
      if (preCheck.folder === "") {
        this.renderError();
      } else {
        formData.append("folder", preCheck.folder);
        this.props.createFolder(formData);
      }
    }
  };

  renderError() {
    alert("Please enter folder name.");
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(event) =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.MyFilesID
            )
          }
          className="ui form"
        >
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <h4>Folder Name</h4>
                <label>
                  <input
                    className="ui input"
                    type="text"
                    name="folderName"
                    placeholder="Enter Folder Name"
                  />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createFolder: (folder) => dispatch(folderActions.createFolder(folder)),
    // updateFile: (id, file) => dispatch(folderActions.updateFile(id, file)),
    checkLoginStatus: () => dispatch(authActions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFolderForm);
