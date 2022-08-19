import React from 'react';
import { MyContext } from '../App';
import { useContext } from 'react';

export const Footer = () => {
    const {loginState} = useContext(MyContext);
    const { profile } = loginState;
    const { isLogin } = profile;
  return (
      <footer className='bg-primary text-white pt-4 pb-3'>
          <div className="container">
              <div className="d-flex justify-content-between align-items-md-center mb-md-5 mb-4">
                  {
                      isLogin ? (
                          <ul className="nav flex-wrap">
                              <li className='footer__item'><a href="" className='nav-link text-white ps-0'>Home</a></li>
                              <li className='footer__item'><a href="" className='nav-link text-white ps-0 ps-md-0-5'>Search</a></li>
                              <li className='footer__item'><a href="" className='nav-link text-white ps-0 ps-md-0-5'>Logout</a></li>
                              <li className='footer__item'><a href="" className='nav-link text-white ps-0 ps-md-0-5'>My account</a></li>
                        </ul>
                      ) : (
                        <ul className="nav">
                            <li className='footer__item'><a href="" className='nav-link text-white ps-0'>Home</a></li>
                            <li className='footer__item'><a href="" className='nav-link text-white ps-0 ps-md-0-5'>Search</a></li>
                            <li className='footer__item'><a href="" className='nav-link text-white ps-0 ps-md-0-5'>Login</a></li>
                        </ul>
                      )
                  }
                <ul className="nav align-items-md-center">
                    <li><a href="" className='nav-link'><img src="/img/facebook.svg" alt="facebook" className='footer__icon'/></a></li>
                    <li><a href="" className='nav-link'><img src="/img/instagram.svg" alt="instagram" className='footer__icon'/></a></li>
                    <li><a href="" className='nav-link'><img src="/img/line.svg" alt="line" className='footer__icon'/></a></li>
                    <li><a href="" className='nav-link'><img src="/img/email.svg" alt="email" className='align-middle footer__icon'/></a></li>
                </ul>
              </div>
              <p className="text-white text-center mb-0">Copyright © 2022 Justin Chen. All rights reserved. </p>
          </div>
    </footer>
  )
}
