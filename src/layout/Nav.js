import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';

const localUrl = process.env.PUBLIC_URL;

const NavOptions = () => {
  const { token, setToken } = useGlobal().auth;
  const { profile, setProfile } = useGlobal().userInfo;

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile');

    setToken(null);
    setProfile(null);
  }
  
  if (!token) {
    return (
      <ul className="navbar-nav align-items-center">
        <li className="nav-item"><a href="" className="nav-link p-lg-0 searchCafe text-white fs-1-5">搜尋咖啡廳</a></li>
        <li className="nav-item"><Link to='/login' type="button" className="btn btn-outline-white me-md-1-25 rounded-pill px-2 d-lg-block d-none">登入</Link></li>
        <li className="nav-item"><Link to='/signup' type="button" className="btn btn-white rounded-pill px-2 d-lg-block d-none">註冊</Link></li>
        <li className="nav-item d-lg-none">
          <Link to='/login' className='nav-link text-white fs-1-5 text-decoration-none'>登入</Link>
        </li>
        <li className="nav-item d-lg-none">
          <Link to='/signup' className='nav-link text-white fs-1-5 text-decoration-none'>註冊</Link>
        </li>
      </ul>
    )
  } else {
    return (
      <ul className="navbar-nav align-items-center">
        <li className="nav-item"><a href="" className="nav-link text-white fs-1-5">搜尋咖啡廳</a></li>
        <li className="nav-item"><a href="" className="nav-link text-white fs-1-5">我的最愛</a></li>
        <li className="nav-item me-lg-0-5"><Link to="/add_cafe" className="nav-link text-white fs-1-5">新增店家</Link></li>
        <li className="nav-item dropdown">
          <a href="" className="nav-link text-white rounded-circle d-none d-lg-inline" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="navbarDropdownMenuLink">
            {false ? <img src="" alt="" /> : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /></svg>}
          </a>
          <ul className="dropdown-menu bg-black m-0" aria-labelledby="navbarDropdownMenuLink">
            <li><p className='dropdown-item text-white'>{profile.name}，您好</p></li>
            <li>
              <a href="" className="text-white nav-link dropdown-item text-center">我的檔案</a>
            </li>
            <li>
              <a href="" className="text-white nav-link dropdown-item text-center" onClick={onLogout}>登出</a>
            </li>
          </ul>
        </li>
        <li className="nav-item"><a href="" className="nav-link text-white d-block d-lg-none fs-1-5">我的檔案</a></li>
      </ul>
    )
  }
}

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a href="" className="navbar-brand p-0 fs-2"><img src={`${localUrl}/img/coffee.svg`} alt="" className=' me-0-5 align-middle' /><img src={`${localUrl}/img/findCafe.svg`} alt="" /></a>
        <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <NavOptions/>
        </div>
      </div>
    </nav>
  )
}
