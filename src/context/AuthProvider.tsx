import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobal } from './GlobalProvider';

interface AuthenticationProps {
  children: ReactNode;
}

export const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
  const { token } = useGlobal().auth;

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};
