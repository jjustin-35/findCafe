import React from 'react';
import { Navbar } from './Nav';
import { Footer } from './Footer';
import { Outlet } from 'react-router';

export const Layout1 = ({outlet}) => {
  return (
      <div>
          <Navbar />
          <Outlet/>
          <Footer/>
    </div>
  )
}
