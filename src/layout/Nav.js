import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
      <nav className='navbar navbar-expend-lg navbar-dark bg-primary '>
          <div className="container-fluid">
              <Link to='/' className="navbar-brand">
                  <span><img src="/img/coffee.svg" alt=""/></span>找找咖啡
              </Link>

              <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link"></Link>
                  </li>
                  <li className="nav-item"><button className="btn-outline-white">登入</button></li>
                  <li className="nav-item"><button className="btn-white">註冊</button></li>
              </ul>
          </div>
        
    </nav>
  )
}
