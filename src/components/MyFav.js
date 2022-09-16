import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { Stars } from './Stars';
import { Tag } from './Tag';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const MyFav = () => {
    const localUrl = process.env.PUBLIC_URL;
    const apiUrl = process.env.REACT_APP_API_URL;
    const { profile } = useGlobal().userInfo;
    const [theFav, setTheFav] = useState([]);
    const [loading, setLoading] = useState(false);
    const { myFav = [] } = profile;

    useEffect(() => {
        setLoading(true);
        (async () => {
            if (myFav.length !== 0) {
                let condition = "";
                for (let fav of myFav) {
                    console.log(fav);
                    condition += `_id=${fav}&`
                }
                console.log(condition);
                let res = await fetch(`${apiUrl}/cafe?${condition}`);
                res = await res.json();

                setTheFav(res.cafes);
            }
            setLoading(false);
        })()
    }, [myFav])

    const handleAddress = (address) => {
        const { country, districts } = address;
        const newAddress = [country, districts];
        
        let str = "";
        newAddress.forEach((element, i) => {
            if (element === "unknown") {
                element = "";
            } else if (i === 0) {
                element += ",";
            }
            str += element;
        })

        return str;
    }

  return (
      <div className="row flex-wrap"> 
          {(() => {
              if (loading) {
                  return (
                    <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-border" style={{width: "3rem", height: "3rem"}}>
                    <span className="visually-hidden">
                        Loading...
                    </span>
                    </div>
                </div>
                )
              } else {
                  return (
                      <div>
                      {theFav.length === 0 ? <div className='text-center'>
                  <p className="fs-2 mb-4 mt-3 text-primary text-center">這裡還沒有東西喔!</p>
                <img src={`${localUrl}/img/profile-default.svg`} alt="nothing here" className="w-30"/>
            </div> : <div>{theFav.map((cafe, i) => {
      return (
          <div className="col-12 mb-1-5" key={cafe._id}>
              <Link to={`/cafe/${cafe.name}`} className='text-decoration-none'>
                  <div className="card h-100">
                      <div className="card-body">
                          <div className="d-flex justify-content-between">
                              <div className="card-tilte fs-1-5 fw-bold">{cafe.name} <span className="bi bi-bookmark-fill text-red ms-0-25"></span></div>
                              <Stars cafe={ cafe } />
                          </div>
                              <p className="text-normal">{ handleAddress(cafe.address) }</p>
                              <Tag cafe={ cafe } />
                      </div>
                  </div>
              </Link>
          </div>
      )
  })}</div>}
                  </div>)
              }
          })()}
    </div>
  )
}
