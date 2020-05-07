import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as folderActions from "../../store/actions/userfolders";

class UserFolderList extends React.Component {
  folderList() {
    const userfolders = this.props.userfolders;
    const selectedUser = this.props.selectedUser;
    return userfolders
      .filter((user) => user.created_by === selectedUser)
      .map((userfolders) => {
        const myFolder = [userfolders];
        return myFolder.map((folder) => {
          return (
            <div className="ui list" key={folder.id}>
              <div className="item">
                <i className="ui folder icon" />
                <div className="content">
                  <Link to={`/MyFolder/${folder.id}`} className="header">
                    <h4
                      onClick={() =>
                        this.props.getSelectedFolder(folder.folder)
                      }
                    >
                      {folder.folder}
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          );
        });
      });
  }

  render() {
    return <div>{this.folderList()}</div>;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedFolder: (folder) =>
      dispatch(folderActions.getSelectedFolderSuccess(folder)),
  };
};
export default connect(null, mapDispatchToProps)(UserFolderList);
