import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './style/css/all.css';
import { HashRouter } from 'react-router-dom';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
