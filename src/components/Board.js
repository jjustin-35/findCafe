import React from 'react';
import { useEffect, useState } from 'react';

export const Board = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [cafes, setCafes] = useState([]);
    // useEffect(() => {
    //     (async () => {
    //         let result = await fetch(`${apiUrl}/cafe/find`);

    //         setCafes(result);
    //     })();
    // }, []);
    
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
                                        <span>Stars</span>
                                    </div>
                                    <div>Tags</div>
                                </div>
                            </div>
                        </div>
                    )
                })}</div> : <p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>}
            
      </div>
    
  )
}
