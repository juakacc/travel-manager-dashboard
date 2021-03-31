import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";

import App from "./App";

// axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
