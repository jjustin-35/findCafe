import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { Stars } from './Stars';
import { Tag } from './Tag';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { Spinner } from './Spinner';

export const MyComment = () => {
    const localUrl = process.env.PUBLIC_URL;
    const apiUrl = process.env.REACT_APP_API_URL;
    const { profile } = useGlobal().userInfo;
    const [theComment, setTheComment] = useState([]);
    const [loading, setLoading] = useState(false);
    const { comment = [] } = profile;

    useEffect(() => {
        setLoading(true);
        (async () => {
            if (comment.length !== 0) {
                let condition = "";
                for (let aComment of comment) {
                    if (!aComment.cafe._id) {
                        condition += `_id=${aComment.cafe}&`;
                    } else {
                        condition +=  `_id=${aComment.cafe._id}&`
                    }
                    
                }
                console.log(condition);
                let res = await fetch(`${apiUrl}/cafe?${condition}`);
                res = await res.json();

                const cafes = res.cafes;
                for (let cafe of cafes) {
                    for (let aComment of comment) {
                        if (aComment.cafe === cafe._id) {
                            aComment.cafe = cafe
                        }
                    }
                }

                setTheComment(comment);
                setLoading(false);
            }
        })()
    }, [comment])

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
                        <Spinner />
                </div>
                )
              } else {
                  return (
                      <div>
                      {theComment.length === 0 ? <div className='text-center'>
                  <p className="fs-2 mb-4 mt-3 text-primary text-center">這裡還沒有東西喔!</p>
                <img src={`${localUrl}/img/profile-default.svg`} alt="nothing here" className="w-30"/>
                          </div> : <div>{theComment.map((comment, i) => {
                              const { cafe } = comment;
                              let date = new Date(comment.time);
                              date = date.toLocaleDateString();
                return (
                    <div className="col-12 mb-1-5" key={`${cafe._id}-${comment._id}`}>
                        <Link to={`/cafe/${cafe.name}`} className='text-decoration-none'>
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="card-tilte fs-1-5 fw-bold">{cafe.name} <span className='ms-0-5 fs-1 text-normal'>{ date }</span></div>
                                        <Stars cafe={ comment } />
                                    </div>
                                    <p className="text-normal">{handleAddress(cafe.address)}</p>
                                    <p>{ comment.post }</p>
                                    <Tag cafe={ comment } />
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
