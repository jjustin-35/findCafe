import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';

const localUrl = process.env.PUBLIC_URL;

const NavOptions = () => {
  const { token, setToken } = useGlobal().auth;
  const { profile, setProfile } = useGlobal().userInfo;
  const { setSearch } = useGlobal().searchState;
  const { setErr } = useGlobal().errState;

  const antor = document.querySelectorAll("a");
  const navbarNav = document.querySelector('#navbarNav');
  antor.forEach((a) => {
    a.addEventListener('click', () => {
      if (navbarNav.classList.contains("show")) {
        navbarNav.classList.remove("show");
      }
    })
  })

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('profile');

    setToken(null);
    setProfile({});
  }

  const navToSearch = () => {
    setSearch({})
  }
  
  if (!token) {
    return (
      <ul className="navbar-nav align-items-center">
        <li className="nav-item"><Link to="/search" className="nav-link p-lg-0 searchCafe text-white fs-1-25" onClick={navToSearch}>搜尋咖啡廳</Link></li>
        <li className="nav-item"><Link to='/login' type="button" className="btn btn-outline-white me-md-1-25 rounded-pill px-2 py-0-25 d-lg-block d-none" onClick={()=>{setErr("")}}>登入</Link></li>
        <li className="nav-item"><Link to='/signup' replace={true} type="button" className="btn btn-white rounded-pill px-2 py-0-25 d-lg-block d-none" onClick={()=>{setErr("")}}>註冊</Link></li>
        <li className="nav-item d-lg-none">
          <Link to='/login' className='nav-link text-white fs-1-25 text-decoration-none' onClick={()=>{setErr("")}}>登入</Link>
        </li>
        <li className="nav-item d-lg-none">
          <Link to='/signup' replace={true} className='nav-link text-white fs-1-25 text-decoration-none' onClick={()=>{setErr("")}}>註冊</Link>
        </li>
      </ul>
    )
  } else {
    return (
      <ul className="navbar-nav align-items-center">
        <li className="nav-item"><Link to="/search" className="nav-link text-white fs-1-25" onClick={navToSearch}>搜尋咖啡廳</Link></li>
        <li className="nav-item"><Link to="/profile" className="nav-link text-white fs-1-25">我的最愛</Link></li>
        {/* <li className="nav-item me-lg-0-5"><Link to="/add_cafe" className="nav-link text-white fs-1-25">新增店家</Link></li> */}
        <li className="nav-item dropdown">
          <a href="" className="nav-link text-white rounded-circle d-none d-lg-block" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="navbarDropdownMenuLink">
            {profile.thumbnail ? <div className="rounded-circle text-center nav-profile bg-white"><img src={profile.thumbnail} alt="" className='h-100'/></div> : <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /></svg>}
          </a>
          <ul className="dropdown-menu dropdown-menu-dark m-0  translate-middle-x" aria-labelledby="navbarDropdownMenuLink">
            <li><p className='text-center pt-0-5 text-white'>{profile.name}，您好</p></li>
            <li>
              <Link to='/profile' className="text-white nav-link dropdown-item text-center">我的檔案</Link>
            </li>
            <li>
              <a href="" className="text-white nav-link dropdown-item text-center" onClick={onLogout}>登出</a>
            </li>
          </ul>
        </li>
        <li className="nav-item"><Link to='/profile' className="nav-link text-white d-block d-lg-none fs-1-25">我的檔案</Link></li>
        <li className="nav-item"><a href="" className="nav-link text-white d-block d-lg-none fs-1-25" onClick={onLogout}>登出</a></li>
      </ul>
    )
  }
}

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
      <div className="container">
        <a href="" className="navbar-brand p-0 fs-2"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" className='me-0-5 align-middle nav-logo'>
          <path d="M30 13.3333H31.6667C33.4348 13.3333 35.1305 14.0357 36.3807 15.2859C37.631 16.5362 38.3333 18.2319 38.3333 20C38.3333 21.7681 37.631 23.4638 36.3807 24.714C35.1305 25.9643 33.4348 26.6666 31.6667 26.6666H30" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.33325 13.3333H29.9999V28.3333C29.9999 30.1014 29.2975 31.7971 28.0473 33.0474C26.7971 34.2976 25.1014 35 23.3333 35H9.99992C8.23181 35 6.53612 34.2976 5.28587 33.0474C4.03563 31.7971 3.33325 30.1014 3.33325 28.3333V13.3333Z" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 1.66669V6.66669" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.6667 1.66669V6.66669" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.3333 1.66669V6.66669" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg><img src={`${localUrl}/img/findCafe.svg`} alt="" height={30}/></a>
        <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <NavOptions/>
        </div>
      </div>
    </nav>
  )
}
