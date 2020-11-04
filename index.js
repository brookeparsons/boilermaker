//entry
// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import store from "./store";
// import "../public/styles/index.css";
// import localSecret from "localSecrets.js";

const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const store = require("./client/store");
require("../public/styles/index.css");
const localSecret = require("localSecrets.js");

ReactDOM.render(
  <Provider store={store}>
    <div>Hello, world!</div>
  </Provider>,
  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
