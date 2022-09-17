import React from 'react';
import { useEffect, useState } from 'react';
import { Select } from '../components/Select';
import { useGlobal } from '../context/GlobalProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
// componants
import { Board } from '../components/Board';

export const Home = () => {
  const navigate = useNavigate();
  const { areas } = useGlobal().address;
  const { setSearch } = useGlobal().searchState;
  const countries = areas.map((area) => area.name);
  countries.unshift('請選擇');
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('');

  const localUrl = process.env.PUBLIC_URL;

  async function handleSearch(e) {
    e.preventDefault();
    if (keyword || country) {
      setSearch({ keyword, address: {country} });
    }
    
    navigate('/search');
  }

  return (
      <div>
      <div className="container-fluid bg-img banner d-flex align-items-center">
        <div className='container'>
          <div className="row justify-content-end">
            <div className="col offset-md-1">
              <h1 className='banner__title fw-bold text-white text-center text-md-start'>找到專屬於你的咖啡廳</h1>
              <div className="mb-1 d-flex justify-content-center justify-content-md-start">
                <input type="text" placeholder='搜尋關鍵字' className='me-md-1 me-0-5 p-0-5 fs-1 rounded-2 banner__search' onChange={(e) => { setKeyword(e.target.value) }} value={keyword} />
                <FormProvider {...useForm()}>
                  <Select opt={countries} name='countries' id='' className='d-inline fs-1 py-0-5' onChange={ (e)=>{setCountry(e.target.value)} } />
                </FormProvider>
                
              </div>
              
              <button className="btn btn-primary text-white d-block px-2 px-md-3 py-0-75 rounded-pill" onClick={handleSearch}>搜索</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-info">
        <div className="container py-md-2-5 pb-1-5 pt-3">
          <div className="row justify-content-center">
            <div className="col col-md-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className='d-block  mx-auto mb-1'>
                <path d="M30 13.3333H31.6667C33.4348 13.3333 35.1305 14.0357 36.3807 15.2859C37.631 16.5362 38.3333 18.2319 38.3333 20C38.3333 21.7681 37.631 23.4638 36.3807 24.714C35.1305 25.9643 33.4348 26.6666 31.6667 26.6666H30" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33325 13.3333H29.9999V28.3333C29.9999 30.1014 29.2975 31.7971 28.0473 33.0474C26.7971 34.2976 25.1014 35 23.3333 35H9.99992C8.23181 35 6.53612 34.2976 5.28587 33.0474C4.03563 31.7971 3.33325 30.1014 3.33325 28.3333V13.3333Z" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 1.66669V6.66669" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.6667 1.66669V6.66669" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23.3333 1.66669V6.66669" stroke="#68472B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className='text-primary fs-1 text-center'>當人們需要個喝咖啡的地方時，往往會陷入不知道要去哪裡、哪裡有咖啡廳、咖啡廳不符合需求的窘境。為了解決這樣的問題，我們架設了這個網站，希望能幫助你找到<span className="fw-bold">最適合你的咖啡廳。</span></p>
            </div>
          </div>
        </div>
        
      </div>

      <div>
        <div className="container-fluid mb-md-2-5 pb-md-0 pb-2 text-primary bg-gray-50">
          <div className="row">
            <img src={`${localUrl}/img/cafeintro_1.png`} alt="cafeintro_1" className="w-100 w-md-55 ps-md-0 px-0 mb-md-0 mb-1" />
            <div className="col-md-5 col my-auto">
              <h2 className="fw-bold fs-2 mb-md-1 mb-0-25">搜尋咖啡廳</h2>
              <p className="fs-1-25">你可以在這裡尋找符合你需求的咖啡廳，為你的工作、學習，或著悠閒的午後時光找一個適合的好地方。</p>
            </div>
          </div>
        </div>
        <div className="container-fluid mb-md-2-5 pb-md-0 pb-2 text-primary bg-gray-50">
          <div className="row flex-row-reverse">
            <img src={`${localUrl}/img/cafeintro_2.png`} alt="cafeintro_2" className="w-100 w-md-55 pe-md-0 px-0 mb-md-0 mb-1" />
            <div className="col-md-5 col my-auto">
              <h2 className="fw-bold fs-2 mb-md-1 mb-0-25">評價、收藏咖啡廳</h2>
              <p className="fs-1-25">為你造訪過的咖啡廳下評論吧！
              不僅僅可以讓更多用戶了解這間咖啡廳，也可以為你留下足跡，繪出屬於你的咖啡地圖！此外，你更可以將喜歡的咖啡廳加入我的最愛，方便再度造訪！</p>
            </div>
          </div>
        </div>
        <div className="container-fluid pb-md-0 pb-2 text-primary bg-gray-50">
          <div className="row">
            <img src={`${localUrl}/img/cafeintro_3.png`} alt="cafeintro_3" className="w-100 w-md-55 ps-md-0 px-0 mb-md-0 mb-1" />
            <div className="col-md-5 col my-auto">
              <h2 className="fw-bold fs-2 mb-md-1 mb-0-25">新增咖啡廳</h2>
              <p className="fs-1-25">找不到你心愛中的咖啡廳嗎？你可以自己新增上來！
              填寫幾個店家的基本資訊，並附上幾張照片以及你的心得、評價，就可以將你喜歡的咖啡廳推薦給其他使用者！</p>
            </div>
          </div>
        </div>
      </div>

      <div className='py-5 container'>
        <h2 className="fs-3 fw-bold text-center mb-3 text-primary">精選店家</h2>
        <Board nowPage={0} perpage={9} />
        <Link to='/search' className="btn btn-primary px-2 py-0-75 rounded-pill d-block w-fit mx-auto" role='button'>瀏覽更多</Link>
      </div>
    </div>
  )
}
