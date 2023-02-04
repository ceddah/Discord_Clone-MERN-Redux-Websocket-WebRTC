import React from "react";
import { render } from "react-dom";

import "./index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
