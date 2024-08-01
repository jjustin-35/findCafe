import React from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';

// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const localUrl = process.env.PUBLIC_URL;

const NavOptions = () => {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token, setToken } = useGlobal().auth;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { profile, setProfile } = useGlobal().userInfo;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setSearch } = useGlobal().searchState;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setErr } = useGlobal().errState;

  const antor = document.querySelectorAll('a');
  const navbarNav = document.querySelector('#navbarNav');
  antor.forEach((a) => {
    a.addEventListener('click', () => {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      if (navbarNav.classList.contains('show')) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        navbarNav.classList.remove('show');
      }
    });
  });

  const onLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile');

    setToken(null);
    setProfile({});
  };

  if (!token) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ul className="navbar-nav align-items-center">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link
            to="/search"
            className="nav-link p-lg-0 searchCafe text-white fs-1-25"
            onClick={() => {
              setSearch({});
              window.scrollTo(0, 0);
            }}
          >
            搜尋咖啡廳
          </Link>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link
            to="/login"
            type="button"
            className="btn btn-outline-white me-md-1-25 rounded-pill px-2 py-0-25 d-lg-block d-none"
            onClick={() => {
              setErr('');
              window.scrollTo(0, 0);
            }}
          >
            登入
          </Link>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link
            to="/signup"
            replace={true}
            type="button"
            className="btn btn-white rounded-pill px-2 py-0-25 d-lg-block d-none"
            onClick={() => {
              setErr('');
              window.scrollTo(0, 0);
            }}
          >
            註冊
          </Link>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item d-lg-none">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link
            to="/login"
            className="nav-link text-white fs-1-25 text-decoration-none"
            onClick={() => {
              setErr('');
              window.scrollTo(0, 0);
            }}
          >
            登入
          </Link>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item d-lg-none">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link
            to="/signup"
            replace={true}
            className="nav-link text-white fs-1-25 text-decoration-none"
            onClick={() => {
              setErr('');
              window.scrollTo(0, 0);
            }}
          >
            註冊
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ul className="navbar-nav align-items-center">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link
            to="/search"
            className="nav-link text-white fs-1-25"
            onClick={() => {
              setSearch({});
              window.scrollTo(0, 0);
            }}
          >
            搜尋咖啡廳
          </Link>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link to="/profile" className="nav-link text-white fs-1-25" onClick={() => window.scrollTo(0, 0)}>
            我的最愛
          </Link>
        </li>
        {/* <li className="nav-item me-lg-0-5"><Link to="/add_cafe" className="nav-link text-white fs-1-25">新增店家</Link></li> */}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item dropdown">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a
            href=""
            className="nav-link text-white rounded-circle d-none d-lg-block py-0"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="navbarDropdownMenuLink"
          >
            {profile.thumbnail ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="rounded-circle text-center nav-profile bg-white w-2-5 h-2-5">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img src={profile.thumbnail} alt="" className="h-100" />
              </div>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            )}
          </a>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ul
            className="dropdown-menu dropdown-menu-dark m-0  translate-middle-x"
            aria-labelledby="navbarDropdownMenuLink"
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className="text-center pt-0-5 text-white">{profile.name}，您好</p>
            </li>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link
                to="/profile"
                className="text-white nav-link dropdown-item text-center"
                onClick={() => window.scrollTo(0, 0)}
              >
                我的檔案
              </Link>
            </li>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <a href="" className="text-white nav-link dropdown-item text-center" onClick={onLogout}>
                登出
              </a>
            </li>
          </ul>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Link to="/profile" className="nav-link text-white d-block d-lg-none fs-1-25">
            我的檔案
          </Link>
        </li>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <li className="nav-item">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a href="" className="nav-link text-white d-block d-lg-none fs-1-25" onClick={onLogout}>
            登出
          </a>
        </li>
      </ul>
    );
  }
};

export const Navbar = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <nav className="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="container">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <a href="" className="navbar-brand p-0 fs-2">
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
        </a>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className="navbar-toggler-icon"></span>
        </button>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <NavOptions />
        </div>
      </div>
    </nav>
  );
};
