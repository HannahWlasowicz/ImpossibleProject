import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Root from "./components/Root";
import TableApp from "./components/Table";

ReactDOM.render(
  <React.StrictMode>
    <Root />
    <TableApp/>
  </React.StrictMode>,
  document.getElementById("root"),
);
