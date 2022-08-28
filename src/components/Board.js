import React from 'react';
import { useEffect, useState } from 'react';

export const Board = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [cafes, setCafes] = useState([]);
    useEffect(() => {
        (async () => {
            let result = await fetch(`${apiUrl}/cafe/find`);

            setCafes(result);
        })();
    }, []);
    
    return (
        <div className='container'>
                {cafes.length !== 0 ? <div className="row-cols-lg-3 row-cols-md-2 row-cols-1 flex-wrap"> 
                {cafes.map((cafe, i) => {
                    return (
                        <div className="col mb-3" key={i}>
                            <div className="card">
                                <img src="" alt="" className="card-img-top" />
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <div className="card-tilte"></div>
                                        <ul className="d-flex">
                                            {(() => {
                                                const starArray = [];
                                                const fill = Math.round(cafe.stars);
                                                const empty = 5 - fill;
                                                for (let i = 0; i < fill; i++){
                                                    const starsFill = <li><i className="bi bi-star-fill"></i></li>
                                                    starArray.push(starsFill);
                                                };
                                                for (let i = 0; i < empty; i++){
                                                    const starEmpty = <li><i className="bi bi-star"></i></li>
                                                    starArray.push(starEmpty);
                                                }
                                                return starArray;
                                            })()}
                                        </ul>
                                    </div>
                                    <div>tags</div>
                                </div>
                            </div>
                        </div>
                    )
                })}</div> : <p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>}
            
      </div>
    
  )
}
