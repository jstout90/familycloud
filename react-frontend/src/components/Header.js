import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/userfiles";
import * as authActions from "../store/actions/auth";

class Header extends React.Component {
  componentDidMount() {
    this.props.checkSelectedUser();
  }
  renderFileNav() {
    const loggedIn = this.props.isAuthenticated;
    if (loggedIn !== null) {
      return (
        <Link to="/MyFiles/" className="item">
          <h3
            onClick={() => this.props.getSelectedUser(this.props.currentUser)}
          >
            My Files
          </h3>
        </Link>
      );
    }
  }
  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <h3>Home</h3>
        </Link>
        {this.renderFileNav()}

        {this.props.isAuthenticated ? (
          <Link to="/" className="item right menu" onClick={this.props.logout}>
            <h3>Logout</h3>
          </Link>
        ) : (
          <Link to="/login" className="item right menu">
            <h3>Login</h3>
          </Link>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    selectedUser: state.userfiles.selectedUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
    getSelectedUser: (user) => dispatch(actions.getSelectedUserSuccess(user)),
    checkSelectedUser: () => dispatch(actions.checkForSelectedUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
