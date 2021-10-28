import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Root from "./views/Root";
import TableApp from "./views/Table";

ReactDOM.render(
  <React.StrictMode>
    <Root />
    <TableApp/>
  </React.StrictMode>,
  document.getElementById("root"),
);
