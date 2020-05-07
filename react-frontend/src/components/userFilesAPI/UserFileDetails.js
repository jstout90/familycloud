import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions/userfiles";
import UserFileForm from "./UserFileForm";
import FileContent from "./FileContent";

class UserFileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.fileDownload = React.createRef();
  }
  componentDidMount() {
    const MyFilesID = this.props.match.params.MyFilesID;
    this.props.userFileDetails(MyFilesID);
  }

  handleDelete = (event) => {
    event.preventDefault();
    const MyFilesID = this.props.match.params.MyFilesID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    this.props.deleteFile(MyFilesID);
  };

  renderForm() {
    const loggedIn = this.props.token;
    if (loggedIn !== null) {
      return (
        <div>
          <UserFileForm
            requestType="put"
            MyFilesID={this.props.match.params.MyFilesID}
            btnText="Update"
          />
          <br />
          <form onSubmit={this.handleDelete}>
            <button className="ui red button" type="submit">
              Delete
            </button>
          </form>
        </div>
      );
    }
  }

  getDownload(fileURL = null) {
    if (fileURL !== null) {
      axios({
        url: fileURL,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = this.fileDownload.current;
        link.href = url;
        link.setAttribute("download", response.config.url.split("/")[5]);
      });
    }
  }
  renderDownloadButton() {
    return (
      <a ref={this.fileDownload} href="_blank" style={{ color: "white" }}>
        <button
          className="ui violet button"
          onClick={this.getDownload(this.props.userFileDetail.file)}
        >
          Download File
        </button>
      </a>
    );
  }

  render() {
    return (
      <div className="ui grid">
        <div className="five wide column">
          <h2>Title: {this.props.userFileDetail.title}</h2>
          <h3>Uploaded Date: {this.props.userFileDetail.uploaded_at}</h3>
          {this.renderDownloadButton()}
        </div>
        <div className="eleven wide column">
          <FileContent {...this.props} />
        </div>
        <div className="sixteen wide column">
          <h4>Change Current File</h4>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userFileDetail: state.userfiles.userFileDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFile: (id) => dispatch(actions.deleteFile(id)),
    userFileDetails: (id) => dispatch(actions.userFileDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFileDetails);
