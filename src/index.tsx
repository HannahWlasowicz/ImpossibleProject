import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Intro from './components/Intro';
import Dropdowns from './components/Dropdowns';
import Root from './components/Root';

ReactDOM.render(
  <React.StrictMode>
    <Navigation/>
    
    <Intro/>
    <Dropdowns/>
    <Root/>
    
  </React.StrictMode>,
  document.getElementById('root')
);