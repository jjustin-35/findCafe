import React from 'react';
import { Navbar } from './Nav';
import { Footer } from './Footer';
import { Spinner } from '../components/Spinner';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

export const Layout1 = () => {
  const [load, setLoad] = useState(true);
  const [top, setTop] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);

  window.addEventListener('scroll', () => {
    setTop(window.scrollY);
  });

  if (load) {
    return <Spinner className="vw-100 vh-100 position-absolute d-flex justify-content-center align-items-center" />;
  }
  return (
    <div>
      <Navbar />
      {top !== 0 && (
        <div className="position-fixed end-3 bottom-4 rounded-circle w-lg-3-5 h-lg-3-5 w-3 h-3 bg-normal opacity-50 d-flex justify-content-center align-items-center z-1">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              window.scroll(0, 0);
            }}
          >
            <span className="fs-1-5 bi bi-chevron-double-up text-white"></span>
          </a>
        </div>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};
