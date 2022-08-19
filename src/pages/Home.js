import React from 'react';
import { useEffect, useContext } from 'react';
import { MyContext } from '../App';

import { Select } from '../components/Select';

export const Home = () => {

  const { address } = useContext(MyContext);
  const { areas, setAreas } = address;
  const countries = areas.map((area) => area.name);
  return (
      <div>
      <div className="container-fluid banner d-flex align-items-lg-center">
        <form action="" className='searchbar'>
          <h2 className='fs-2 text-white'>找到專屬於你的咖啡</h2>
          <input type="text" placeholder='' />
          <Select opt={countries} name='countries' id='' />
          <button className="btn btn-primary text-white">搜索</button>
        </form>
      </div>

      <div className="container-fluid">
        <img src="" alt="" className="d-block text-align-center" />
        <p>當人們需要個喝咖啡的地方時，往往會陷入不知道要去哪裡、哪裡有咖啡廳、咖啡廳不符合需求的窘境。為了解決這樣的問題，我們架設了這個網站，希望能幫助你找到最適合你的咖啡廳。</p>
      </div>
    </div>
  )
}
