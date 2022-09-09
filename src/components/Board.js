import React from 'react';
import { useEffect, useState } from 'react';
import { useGlobal } from '../context/GlobalProvider';

export const Board = (props) => {
    const { nowPage, perpage, pages, setPages, setNowPage} = props;
    const { search } = useGlobal().searchState;
    const { address, keyword, ...querys } = search;
    // address = {country, district, location, mrt}
    const queryUrl = process.env.REACT_APP_API_URL2 + "/cafe";
    const localUrl = process.env.PUBLIC_URL;
    const [cafes, setCafes] = useState([]);
    const [wantCafes, setWantCafes] = useState([]);

    // function
    const isEmpty = (obj) => {
        for (let i in obj) {
            return false
        }

        return true;
    }

    const getTag = (obj) => {
        const { rank } = obj;
        let rankList = [];
        for (let i in rank) {
            rankList.push({name: i, rank: rank[i]})
        }

        rankList.sort((a, b) => {
            return b.rank - a.rank
        })
        rankList = rankList.slice(0, 3);
        rankList = rankList.map((element) => {
            element = element.name;

            const chinese = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
            
            ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'].forEach((tag, i)=>{
                if (element === tag) {
                    element = chinese[i];
                }
            })
            return element;
        });

        return rankList;
    }

    useEffect(() => {
        (async () => {
            let queryString = "";
            for (let query of [address, querys]) {
                if (!isEmpty(query)) {
                    for (let i in query) {
                        if (query[i]) {
                            queryString += `&${i}=${query[i]}`;
                        }
                    }
                }
            }
            try {                
                let result = await fetch(queryUrl + `?perPage=${perpage}&page=${nowPage}` + queryString);
                result = await result.json();

                setCafes(result);
            } catch (err) {
                console.log(err)
            };
        })();
    }, [cafes, search, nowPage]);

    // handle fn
    const handlePage = (e) => {
        let turn = e.target.id;

        if (turn === 'before') {
            setNowPage(nowPage - 1);
        } else if (turn === 'after') {
            setNowPage(nowPage + 1);
        } else {
            turn = Number(turn);
            setNowPage(turn);
        }
    }
    
    return (
        <div className='container'>
            {cafes.length !== 0 ? <div className="row flex-wrap"> 
            {cafes.map((cafe, i) => {
                return (
                    <div className="col-lg-4 col-md-6 col-12 mb-3" key={cafe._id}>
                        <a href="" className='text-decoration-none'>
                        <div className="card h-100">
                            <img src={cafe.img[0] ? cafe.img[0] : `${localUrl}/img/cafe.png`} alt={`${cafe.name} img`} className="card-img-top" />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div className="d-flex justify-content-between">
                                    <div className="card-tilte fs-1-5 fw-bold">{cafe.name}</div>
                                    <ul className="d-flex list-unstyled">
                                        {(() => {
                                            const starArray = [];
                                            const fill = cafe.stars;
                                            const empty = 5 - fill;
                                            for (let i = 0; i < fill; i++){
                                                const starsFill = <li key={`${cafe._id} ${i}fillstar`}><i className="bi bi-star-fill fs-1-5 text-yellow"></i></li>
                                                starArray.push(starsFill);
                                            };
                                            for (let i = 0; i < empty; i++){
                                                const starEmpty = <li key={`${cafe._id} ${i}emptystar`}><i className="bi bi-star fs-1-5 text-gray-500"></i></li>
                                                starArray.push(starEmpty);
                                            }
                                            return starArray;
                                        })()}
                                    </ul>
                                </div>
                                    <ul className='d-flex list-unstyled'>{getTag(cafe).map((tag, i) => <li className='me-0-25 bg-gray-light rounded-pill px-0-75 py-0-25' key={tag + i}>{ tag }</li>)}</ul>
                            </div>
                        </div>
                        </a>
                    </div>
                )
            })}</div> : <p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>}
            {pages > 1 && <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item" key={'before page'}><a href="" className="page-link" id='before' onClick={handlePage}>前一頁</a></li>
                    {(() => {
                        let pageControl = pages > 5 ? 5 : pages;
                        let list = [];
                        for (let i = nowPage + 1; i <= pageControl; i++){
                             list.push(<li className='page-item' key={i+'page'}><a className='page-link' href="" id={ i } onClick={handlePage}>{ i }</a></li>)
                        }

                        return list;
                    })()}
                    <li className="page-item" key={'after page'}><a href="" className="page-link" id='after' onClick={handlePage}>後一頁</a></li>
                </ul>
            </nav>}
      </div>
    
  )
}
