import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/auth";

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    this.props.onAuth(username, password);
  };

  renderError() {
    if (this.props.loginStatus === 400) {
      return <h3>Incorrect Username or Password</h3>;
    }
  }

  render() {
    return (
      <div className="ui placeholder segment">
        <div className="ui two column very relaxed stackable grid">
          <div className="column">
            <form onSubmit={this.handleSubmit}>
              <div className="ui form">
                <div className="field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input type="text" name="username" placeholder="Username" />
                    <i className="user icon"></i>
                  </div>
                </div>
                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input type="password" name="password" />
                    <i className="lock icon"></i>
                  </div>
                </div>
                <div className="field">{this.renderError()}</div>
                <button className="ui blue submit button" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="middle aligned column">
            <Link to="/signup" className="item">
              <div className="ui big button">
                <i className="signup icon"></i>
                Sign Up
              </div>
            </Link>
          </div>
        </div>
        <div className="ui vertical divider">Or</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    loginStatus: state.auth.loginStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
