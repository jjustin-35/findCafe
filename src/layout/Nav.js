import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../App'; 

const NavOptions = () => {
  const {loginState} = useContext(MyContext);
  // const { profile, setProfile } = loginState;
  // const { info, isLogin } = profile;
  const isLogin = true;
  
  if (!isLogin) {
    return (
      <ul className="navbar-nav align-items-center">
        <li className="nav-item"><a href="" className="nav-link p-0 searchCafe text-white fs-4">搜尋咖啡廳</a></li>
        <li className="nav-item"><a href="" type="button" className="btn btn-outline-white me-1-25 rounded-pill px-2">登入</a></li>
        <li className="nav-item"><a href="" type="button" className="btn btn-white rounded-pill px-2">註冊</a></li>
      </ul>
    )
  } else {
    return (
      <ul className="navbar-nav align-items-center">
        <li className="nav-item"><a href="" className="nav-link text-white fs-4">搜尋咖啡廳</a></li>
        <li className="nav-item"><a href="" className="nav-link text-white fs-4">我的最愛</a></li>
        <li className="nav-item me-0-5"><a href="" type="button" className="nav-link text-white fs-4">新增店家</a></li>
        <li className="nav-item"><a href="" className="nav-link text-white rounded-circle">{ false ? <img src="" alt="" /> : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg> }</a></li>
      </ul>
    )
  }
}

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a href="" className="navbar-brand p-0 fs-2"><img src="/img/coffee.svg" alt="" className=' me-0-5 align-middle' /><img src="/img/findCafe.svg" alt="" /></a>
        <button className="navbar-toggler" data-bs-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <NavOptions/>
        </div>
      </div>
    </nav>
  )
}
