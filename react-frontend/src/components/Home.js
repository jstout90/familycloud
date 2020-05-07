import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/userfiles";
import * as folderActions from "../store/actions/userfolders";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchUserList();
    this.props.checkSelectedUser();
    this.props.checkSelectedFolder();
  }
  userList() {
    const allUsers = this.props.userlist;
    return allUsers.map((user) => (
      <Link to="/MyFiles/" key={user.id}>
        <h4 onClick={() => this.props.getSelectedUser(user.username)}>
          {user.username}
        </h4>
      </Link>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <h1>
            <center>Home Page</center>
          </h1>
        </div>
        <div className="ui segment">
          <h1>
            <center>Select User to Browse Uploads</center>
          </h1>
          <div className="ui stackable grid">
            <div className="column">{this.userList()}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userlist: state.userfiles.userlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserList: () => dispatch(actions.getAllUsers()),
    getSelectedUser: (user) => dispatch(actions.getSelectedUserSuccess(user)),
    checkSelectedUser: () => dispatch(actions.checkForSelectedUser()),
    checkSelectedFolder: () => dispatch(folderActions.checkForSelectedFolder()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
