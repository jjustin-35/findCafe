import React from 'react';
import { Navbar } from './Nav';
import { Footer } from './Footer';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

export const Layout1 = ({ outlet }) => {
  const [load, setLoad] = useState(true);
  const [top, setTop] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 2000)
  }, [])

  window.addEventListener('scroll', (e) => {
    setTop(window.scrollY)
  })
  
  if (load) {
    return (
      <div className='vw-100 vh-100 position-absolute d-flex justify-content-center align-items-center'>
        <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='loading'>
          <path d="M30 13.3333H31.6667C33.4348 13.3333 35.1305 14.0357 36.3807 15.2859C37.631 16.5362 38.3333 18.2319 38.3333 20C38.3333 21.7681 37.631 23.4638 36.3807 24.714C35.1305 25.9643 33.4348 26.6666 31.6667 26.6666H30" stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.33325 13.3333H29.9999V28.3333C29.9999 30.1014 29.2975 31.7971 28.0473 33.0474C26.7971 34.2976 25.1014 35 23.3333 35H9.99992C8.23181 35 6.53612 34.2976 5.28587 33.0474C4.03563 31.7971 3.33325 30.1014 3.33325 28.3333V13.3333Z" stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 1.66669V6.66669" stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.6667 1.66669V6.66669" stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.3333 1.66669V6.66669" stroke="brown" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      {top !== 0 && (<div className='position-fixed w-fit end-3 bottom-4 rounded-circle w-lg-5 h-5 bg-normal opacity-75 d-flex justify-content-center align-items-center'>
        <a href="" onClick={e => { e.preventDefault(); window.scroll(0, 0) }}>
          <span className='fs-2-5 bi bi-chevron-double-up text-white'></span>
        </a>
      </div>)}
      <Outlet />
      <Footer/>
    </div>
  )
}
