import React, { Component } from "react";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../history/history";
import BaseRouter from "./routes";
import Header from "./Header";
import * as actions from "../store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="ui container segment">
        <Router history={history}>
          <div>
            <Header {...this.props} />
            <BaseRouter />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
