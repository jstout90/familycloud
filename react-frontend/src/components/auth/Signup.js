import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";

class Signup extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password1 = e.target.elements.password1.value;
    const password2 = e.target.elements.password2.value;
    this.props.onAuth(username, email, password1, password2);
  };

  renderError() {
    if (this.props.loginStatus === 400) {
      return <h3>Please fill in each field.</h3>;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ui form">
          <div className="fields">
            <div className="field">
              <label>Username</label>
              <input name="username" type="text" placeholder="Username" />
            </div>
            <div className="field">
              <label>Email</label>
              <input name="email" type="email" placeholder="Email" />
            </div>
          </div>
          <div className="ui fields">
            <div className="field">
              <label>Password</label>
              <div className="ui left icon input">
                <input type="password" name="password1" />
                <i className="lock icon"></i>
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <div className="ui left icon input">
                  <input type="password" name="password2" />
                  <i className="lock icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="field">{this.renderError()}</div>
          <input
            className="ui blue submit button"
            type="submit"
            value="Signup"
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    loginStatus: state.auth.loginStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
