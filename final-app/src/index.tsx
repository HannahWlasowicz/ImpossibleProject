import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Root from "./components/Root";
import PieChart from "./Arc";

ReactDOM.render(
  <React.StrictMode>
    {/* <PieChart></PieChart> */}
    <Root />
    {/* <TableApp/> */}
  </React.StrictMode>,
  document.getElementById("root"),
);
