import React from 'react';
import { node } from 'prop-types';
import { Navigate } from 'react-router';
import { useGlobal } from './GlobalProvider';

export const Authentication = ({ children }) => {
  const { token } = useGlobal().auth;
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'} replace={true} />;
  }
};

Authentication.propTypes = {
  children: node,
};
