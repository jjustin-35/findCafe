import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
// @ts-expect-error TS(6142): Module './App' was resolved to 'C:/Users/user/Desk... Remove this comment to see the full error message
import { App } from './App';
import './style/css/all.css';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { HashRouter } from 'react-router-dom';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <StrictMode>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the
    full error message
    <HashRouter>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see
      the full error message
      <App />
    </HashRouter>
  </StrictMode>,
);
