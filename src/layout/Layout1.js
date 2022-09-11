import React from 'react';
import { Navbar } from './Nav';
import { Footer } from './Footer';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

export const Layout1 = ({ outlet }) => {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 2000)
  }, [])
  
  if (load) {
    return (
      <div className='vw-100 vh-100 position-absolute'>
        <div className="spinner-border text-primary position-absolute top-50 start-50 translate-middle w-2-5 h-2-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
      <div>
          <Navbar />
          <Outlet/>
          <Footer/>
    </div>
  )
}
