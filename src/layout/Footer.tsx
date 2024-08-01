import React from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';

export const Footer = () => {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token, setToken } = useGlobal().auth;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setProfile } = useGlobal().userInfo;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setSearch } = useGlobal().searchState;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setErr } = useGlobal().errState;

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const localUrl = process.env.PUBLIC_URL;

  const onLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile');

    setToken(null);
    setProfile(null);
  };
  const navToSearch = () => {
    setSearch({});
  };
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <footer className="bg-primary text-white pt-4 pb-3">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="container">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="d-flex justify-content-between align-items-md-center mb-md-5 mb-4">
          {token ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ul className="nav flex-wrap">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <a href="" className="nav-link text-white ps-0">
                  Home
                </a>
              </li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/search" className="nav-link text-white ps-0 ps-md-0-5" onClick={navToSearch}>
                  Search
                </Link>
              </li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <a href="" className="nav-link text-white ps-0 ps-md-0-5" onClick={onLogout}>
                  Logout
                </a>
              </li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/profile" className="nav-link text-white ps-0 ps-md-0-5">
                  My account
                </Link>
              </li>
            </ul>
          ) : (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ul className="nav">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <a href="" className="nav-link text-white ps-0">
                  Home
                </a>
              </li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/search" className="nav-link text-white ps-0 ps-md-0-5" onClick={navToSearch}>
                  Search
                </Link>
              </li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="footer__item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link
                  to="/login"
                  className="nav-link text-white ps-0 ps-md-0-5"
                  onClick={() => {
                    setErr('');
                  }}
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="navbar-brand p-0 fs-2 me-lg-5">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              className="me-0-5 align-middle nav-logo"
            >
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <path
                d="M30 13.3333H31.6667C33.4348 13.3333 35.1305 14.0357 36.3807 15.2859C37.631 16.5362 38.3333 18.2319 38.3333 20C38.3333 21.7681 37.631 23.4638 36.3807 24.714C35.1305 25.9643 33.4348 26.6666 31.6667 26.6666H30"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <path
                d="M3.33325 13.3333H29.9999V28.3333C29.9999 30.1014 29.2975 31.7971 28.0473 33.0474C26.7971 34.2976 25.1014 35 23.3333 35H9.99992C8.23181 35 6.53612 34.2976 5.28587 33.0474C4.03563 31.7971 3.33325 30.1014 3.33325 28.3333V13.3333Z"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <path
                d="M10 1.66669V6.66669"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <path
                d="M16.6667 1.66669V6.66669"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <path
                d="M23.3333 1.66669V6.66669"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={`${localUrl}/img/findCafe.svg`} alt="" height={30} />
          </div>
        </div>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className="text-white text-center mb-0">Copyright © 2022 Justin Chen. All rights reserved. </p>
      </div>
    </footer>
  );
};
