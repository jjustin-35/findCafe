'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/config/configureStore';
import { setSearch, setErr } from '@/redux/search';
import { setProfile } from '@/redux/user';
import Image from 'next/image';

  const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    dispatch({ type: 'auth/setToken', payload: null });
    dispatch(setProfile(null));
  };

  const navToSearch = () => {
    dispatch(setSearch({}));
  };

  return (
    <footer className="bg-primary text-white pt-4 pb-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-md-center mb-md-5 mb-4">
          {token ? (
            <ul className="nav flex-wrap">
              <li className="footer__item">
                <Link href="/" className="nav-link text-white ps-0">
                  Home
                </Link>
              </li>
              <li className="footer__item">
                <Link href="/search" className="nav-link text-white ps-0 ps-md-0-5" onClick={navToSearch}>
                  Search
                </Link>
              </li>
              <li className="footer__item">
                <a href="#" className="nav-link text-white ps-0 ps-md-0-5" onClick={onLogout}>
                  Logout
                </a>
              </li>
              <li className="footer__item">
                <Link href="/profile" className="nav-link text-white ps-0 ps-md-0-5">
                  My account
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav">
              <li className="footer__item">
                <Link href="/" className="nav-link text-white ps-0">
                  Home
                </Link>
              </li>
              <li className="footer__item">
                <Link href="/search" className="nav-link text-white ps-0 ps-md-0-5" onClick={navToSearch}>
                  Search
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  href="/login"
                  className="nav-link text-white ps-0 ps-md-0-5"
                  onClick={() => {
                    dispatch(setErr(''));
                  }}
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
          <div className="navbar-brand p-0 fs-2 me-lg-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              className="me-0-5 align-middle nav-logo"
            >
              <path
                d="M30 13.3333H31.6667C33.4348 13.3333 35.1305 14.0357 36.3807 15.2859C37.631 16.5362 38.3333 18.2319 38.3333 20C38.3333 21.7681 37.631 23.4638 36.3807 24.714C35.1305 25.9643 33.4348 26.6666 31.6667 26.6666H30"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33325 13.3333H29.9999V28.3333C29.9999 30.1014 29.2975 31.7971 28.0473 33.0474C26.7971 34.2976 25.1014 35 23.3333 35H9.99992C8.23181 35 6.53612 34.2976 5.28587 33.0474C4.03563 31.7971 3.33325 30.1014 3.33325 28.3333V13.3333Z"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 1.66669V6.66669"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.6667 1.66669V6.66669"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.3333 1.66669V6.66669"
                stroke="#68472B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Image src="/img/findCafe.svg" alt="" width={30} height={30} />
          </div>
        </div>
        <p className="text-white text-center mb-0">Copyright © 2022 Justin Chen. All rights reserved. </p>
      </div>
    </footer>
  );
};

export default Footer;