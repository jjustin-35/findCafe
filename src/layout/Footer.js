import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';

export const Footer = () => {
  const { token, setToken } = useGlobal().auth;
  const { setProfile } = useGlobal().userInfo;
  const { setSearch } = useGlobal().searchState;
  const { setErr } = useGlobal().errState;
  
  const localUrl = process.env.PUBLIC_URL;

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile');

    setToken(null);
    setProfile(null);
  }
  const navToSearch = () => {
    setSearch({})
  }
  return (
      <footer className='bg-primary text-white pt-4 pb-3'>
          <div className="container">
              <div className="d-flex justify-content-between align-items-md-center mb-md-5 mb-4">
                  {
                      token ? (
                          <ul className="nav flex-wrap">
                              <li className='footer__item'><a href="" className='nav-link text-white ps-0'>Home</a></li>
                              <li className='footer__item'><Link to="/search" className='nav-link text-white ps-0 ps-md-0-5' onClick={navToSearch}>Search</Link></li>
                              <li className='footer__item'><a href="" className='nav-link text-white ps-0 ps-md-0-5'onClick={onLogout}>Logout</a></li>
                              <li className='footer__item'><Link to="/profile" className='nav-link text-white ps-0 ps-md-0-5'>My account</Link></li>
                        </ul>
                      ) : (
                        <ul className="nav">
                            <li className='footer__item'><a href="" className='nav-link text-white ps-0'>Home</a></li>
                            <li className='footer__item'><Link to="/search" className='nav-link text-white ps-0 ps-md-0-5' onClick={navToSearch}>Search</Link></li>
                            <li className='footer__item'><Link to="/login" className='nav-link text-white ps-0 ps-md-0-5'  onClick={()=>{setErr("")}}>Login</Link></li>
                        </ul>
                      )
                  }
                <ul className="nav align-items-md-center flex-nowrap">
                    <li><a href="" className='nav-link px-md-auto px-0-5'><img src={`${localUrl}/img/facebook.svg`} alt="facebook" className='footer__icon'/></a></li>
                    <li><a href="" className='nav-link px-md-auto px-0-5'><img src={`${localUrl}/img/instagram.svg`} alt="instagram" className='footer__icon'/></a></li>
                    <li><a href="" className='nav-link px-md-auto px-0-5'><img src={`${localUrl}/img/line.svg`} alt="line" className='footer__icon'/></a></li>
                    <li><a href="" className='nav-link  px-md-auto px-0-5'><img src={`${localUrl}/img/email.svg`} alt="email" className='align-middle footer__icon'/></a></li>
                </ul>
              </div>
              <p className="text-white text-center mb-0">Copyright © 2022 Justin Chen. All rights reserved. </p>
          </div>
    </footer>
  )
}
