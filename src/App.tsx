import React from 'react';
import { createContext } from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router'. Did you mean to... Remove this comment to see the full error message
import { Routes, Route } from 'react-router';

// componants
// @ts-expect-error TS(6142): Module './pages/AddCafe' was resolved to 'C:/Users... Remove this comment to see the full error message
import { AddCafe } from './pages/AddCafe';
// @ts-expect-error TS(6142): Module './layout/Layout1' was resolved to 'C:/User... Remove this comment to see the full error message
import { Layout1 } from './layout/Layout1';
// @ts-expect-error TS(6142): Module './pages/Home' was resolved to 'C:/Users/us... Remove this comment to see the full error message
import { Home } from './pages/Home';
// @ts-expect-error TS(6142): Module './pages/Notfound' was resolved to 'C:/User... Remove this comment to see the full error message
import { Notfound } from './pages/Notfound';
// @ts-expect-error TS(6142): Module './context/AuthProvider' was resolved to 'C... Remove this comment to see the full error message
import { Authentication } from './context/AuthProvider';
// @ts-expect-error TS(6142): Module './context/GlobalProvider' was resolved to ... Remove this comment to see the full error message
import { GlobalProvider } from './context/GlobalProvider';
// @ts-expect-error TS(6142): Module './pages/Login' was resolved to 'C:/Users/u... Remove this comment to see the full error message
import { Login } from './pages/Login';
// @ts-expect-error TS(6142): Module './pages/Signup' was resolved to 'C:/Users/... Remove this comment to see the full error message
import { Signup } from './pages/Signup';
// @ts-expect-error TS(6142): Module './pages/Forgotpwd' was resolved to 'C:/Use... Remove this comment to see the full error message
import { Forgotpwd } from './pages/Forgotpwd';
// @ts-expect-error TS(6142): Module './pages/Find' was resolved to 'C:/Users/us... Remove this comment to see the full error message
import { Find } from './pages/Find';
// @ts-expect-error TS(6142): Module './pages/Profile' was resolved to 'C:/Users... Remove this comment to see the full error message
import { Profile } from './pages/Profile';
// @ts-expect-error TS(6142): Module './pages/Cafe' was resolved to 'C:/Users/us... Remove this comment to see the full error message
import { Cafe } from './pages/Cafe';
// @ts-expect-error TS(6142): Module './components/MyFav' was resolved to 'C:/Us... Remove this comment to see the full error message
import { MyFav } from './components/MyFav';

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
export const MyContext = createContext();
export const App = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see
      the full error message
      <GlobalProvider>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see
        the full error message
        <Routes>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
          see the full error message
          <Route path="/" element={<Layout1 />}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route index element={<Home />} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route
              path="/profile"
              element={
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Authentication>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this
                  comment to see the full error message
                  <Profile />
                </Authentication>
              }
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route path="/search" element={<Find />} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route path="/cafe/:cafeName" element={<Cafe />} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route
              path="/add_cafe"
              element={
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Authentication>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this
                  comment to see the full error message
                  <AddCafe />
                </Authentication>
              }
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route path="/login" element={<Login />} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route path="/signup" element={<Signup />} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
            see the full error message
            <Route path="/forgotpwd" element={<Forgotpwd />} />
          </Route>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to
          see the full error message
          <Route path="*" element={<Notfound />} />
        </Routes>
      </GlobalProvider>
    </>
  );
};
