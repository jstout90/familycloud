import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import allReducer from "./store/reducers";

const composeEnhances = compose;
const store = createStore(allReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.querySelector("#root"));
