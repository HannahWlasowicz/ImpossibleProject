import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './Graph';
import TableApp from './Table';

ReactDOM.render(
  <React.StrictMode>
   <App></App>
   <TableApp></TableApp>
  </React.StrictMode>,
  document.getElementById('root')
);
