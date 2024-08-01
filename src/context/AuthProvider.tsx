import React from 'react';
import { node } from 'prop-types';
// @ts-expect-error TS(2792): Cannot find module 'react-router'. Did you mean to... Remove this comment to see the full error message
import { Navigate } from 'react-router';
// @ts-expect-error TS(6142): Module './GlobalProvider' was resolved to 'C:/User... Remove this comment to see the full error message
import { useGlobal } from './GlobalProvider';

export const Authentication = ({
  children
}: any) => {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token } = useGlobal().auth;
  if (token) {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>{children}</>;
  } else {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <Navigate to={'/login'} replace={true} />;
  }
};

Authentication.propTypes = {
  children: node,
};
