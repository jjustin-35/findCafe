import React from 'react';
// @ts-expect-error TS(6142): Module './Nav' was resolved to 'C:/Users/user/Desk... Remove this comment to see the full error message
import { Navbar } from './Nav';
// @ts-expect-error TS(6142): Module './Footer' was resolved to 'C:/Users/user/D... Remove this comment to see the full error message
import { Footer } from './Footer';
// @ts-expect-error TS(6142): Module '../components/Spinner' was resolved to 'C:... Remove this comment to see the full error message
import { Spinner } from '../components/Spinner';
// @ts-expect-error TS(2792): Cannot find module 'react-router'. Did you mean to... Remove this comment to see the full error message
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <Spinner className="vw-100 vh-100 position-absolute d-flex justify-content-center align-items-center" />;
  }
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see
      the full error message
      <Navbar />
      {top !== 0 && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="position-fixed end-3 bottom-4 rounded-circle w-lg-3-5 h-lg-3-5 w-3 h-3 bg-normal opacity-50 d-flex justify-content-center align-items-center z-1">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
          see the full error message
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              window.scroll(0, 0);
            }}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <span className="fs-1-5 bi bi-chevron-double-up text-white"></span>
          </a>
        </div>
      )}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see
      the full error message
      <Outlet />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see
      the full error message
      <Footer />
    </div>
  );
};
