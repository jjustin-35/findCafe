import React from 'react';
import { useEffect, useState } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { Link } from 'react-router-dom';

export const Board = (props) => {
    const { nowPage, perpage, pages, setPages, setNowPage } = props;
    const { search } = useGlobal().searchState;
    const { address, keyword, ...querys } = search;
    // address = {country, district, location, mrt}
    const queryUrl = process.env.REACT_APP_API_URL2 + "/cafe";
    const localUrl = process.env.PUBLIC_URL;
    const [cafes, setCafes] = useState([]);
    const [isData, setIsData] = useState(true);

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
            rankList.push({ name: i, rank: rank[i] })
        }

        rankList.sort((a, b) => {
            return b.rank - a.rank
        })
        rankList = rankList.slice(0, 3);
        rankList = rankList.map((element) => {
            element = element.name;

            const chinese = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
            
            ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'].forEach((tag, i) => {
                if (element === tag) {
                    element = chinese[i];
                }
            })
            return element;
        });

        return rankList;
    }

    useEffect(() => {
        let queryString = "";
        for (let query of [address, querys]) {
            if (!isEmpty(query)) {
                for (let i in query) {
                    let star = i.match(/star/);

                    if (star && query[i]) {
                        for (let s of query[i]) {
                            queryString += `&${star[0]}=${s}`;
                        }
                    } else if (query[i]) {
                        queryString += `&${i}=${query[i]}`;
                    }
                }
            }
        }

        console.log(queryString);

        (async () => {
            try {
                let result = await fetch(queryUrl + `?perPage=${perpage}&page=${nowPage}` + queryString);
                console.log(result);
                result = await result.json();

                const { length, cafes } = result;

                console.log(cafes);
                if (cafes.length === 0) {
                    setIsData(false);
                }
                setCafes(cafes);
                if (setPages) {
                    setPages((length/perpage));
                }
            } catch (err) {
                console.log(err)
            };
        })();
        
    }, [search, nowPage]);

    // handle fn
    const handlePage = (e) => {
        e.preventDefault();
        let turn = e.target.id;

        if (turn === 'before') {
            setNowPage(nowPage - 1);
        } else if (turn === 'after') {
            setNowPage(nowPage + 1);
        } else {
            turn = Number(turn);
            setNowPage(turn - 1);
        }
    }

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
        <div>
            {(() => {
                if (isData) {
                    if (cafes.length === 0) {
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
                        return (<div className="row flex-wrap"> 
                        {cafes.map((cafe, i) => {
                            return (
                                <div className="col-12 mb-1-5" key={cafe._id}>
                                    <Link to={`/cafe/${cafe.name}`} className='text-decoration-none'>
                                    <div className="card h-100">
                                        {/* <img src={cafe.img[0] ? cafe.img[0] : `${localUrl}/img/cafe.png`} alt={`${cafe.name} img`} className="card-img-top" /> */}
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div className="card-tilte fs-1-5 fw-bold">{cafe.name}</div>
                                                <ul className="d-flex list-unstyled">
                                                    {(() => {
                                                        const starArray = [];
                                                        const fill = Math.round(cafe.stars);
                                                        const empty = 5 - fill;
                                                        for (let i = 0; i < fill; i++){
                                                            const starsFill = <li key={`${cafe._id} ${i}fillstar`}><i className="bi bi-star-fill fs-1-5 text-yellow"></i></li>
                                                            starArray.push(starsFill);
                                                        };
                                                        for (let i = 0; i < empty; i++){
                                                            const starEmpty = <li key={`${cafe._id} ${i}emptystar`}><i className="bi bi-star-fill fs-1-5 text-normal"></i></li>
                                                            starArray.push(starEmpty);
                                                        }
                                                        return starArray;
                                                    })()}
                                                </ul>
                                            </div>
                                                <p className="text-normal">{ handleAddress(cafe.address) }</p>
                                            <ul className='d-flex list-unstyled'>{getTag(cafe).map((tag, i) => <li className='me-0-25 bg-gray-light rounded-pill px-0-75 py-0-25' key={tag + i}>{ tag }</li>)}</ul>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            )
                        })}</div>)
                    }
                } else {
                    return (<p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>)
                }
            })()}
            {pages > 1 && <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item" key={'before page'}><a href="" className="page-link" id='before' onClick={handlePage}>前一頁</a></li>
                    {(() => {
                        let start = 0;
                        let pageControl = 0;
                        if (nowPage % 5 === 0) {
                            start = nowPage;
                        } else {
                            start = nowPage - (nowPage % 5);
                        }
                        if (nowPage + 5 <= pages) {
                            if ((nowPage + 5) % 5 === 0) {
                                pageControl = nowPage + 5;
                            } else {
                                pageControl = ((nowPage + 5) - ((nowPage + 5) % 5))
                            }
                        } else {
                            pageControl = pages;
                        }
                        let list = [];
                        for (let i = start + 1; i <= pageControl; i++){
                             list.push(<li className={'page-item ' + ( nowPage + 1 === i ? "active" : "")} key={i+'page'}><a className='page-link' href="" id={ i } onClick={handlePage}>{ i }</a></li>)
                        }

                        return list;
                    })()}
                    <li className="page-item" key={'after page'}><a href="" className="page-link" id='after' onClick={handlePage}>後一頁</a></li>
                </ul>
            </nav>}
      </div>
    
  )
}
