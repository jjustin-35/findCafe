import React from 'react';
import { useEffect, useState } from 'react';

export const Board = (props) => {
    const { nowPage, perpage, ...querys } = props;
    const nomad = process.env.REACT_APP_NOMAD_URL;
    const proxy = process.env.REACT_APP_PROXY_URL;

    const [cafes, setCafes] = useState([]);
    const [wantCafes, setWantCafes] = useState([]);

    // function
    const countStars = (obj) => {
        const query = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];
        let stars = 0;

        query.forEach(element => {
            stars += (Number(obj[element]) / query.length);
        })

        return stars;
    }

    function queryCafe(cafes){
        let result = [...cafes];
        for (let query in querys) {
            result = result.filter(cafe => {
                return cafe[query] >= querys[query];
            })
        }
        
        return result;
    }

    const setAmount = (cafes, from = 0, to = 14) => {
        return cafes.slice(from, to);
    };

    const ranking = (list) => {
        return list.sort((a, b) => b.stars - a.stars);
    }

    const getTag = (cafe) => {
        let tags = [];
        for (let i in cafe) {
            if (!isNaN(cafe[i]) && Number(cafe[i]) <= 5) {
                if (cafe[i] >= 3) {
                    let theTag = {};
                    theTag[i] = cafe[i];
                    tags = [...tags, theTag];
                }
            }
        }

        tags.sort((a, b) => {
            let aValue;
            let bValue;
            for (let p in a) {
                aValue = a[p];
            }
            for (let p in b) {
                bValue = b[p];
            }

            return bValue - aValue;
        });

        tags = tags.map((tag) => {
            for (let name in tag) {
                name = dealTag(name);
                return name;
            }
        })

        return tags.slice(0, 3);
    }

    const dealTag = (tag) => {
        const tagList = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];
        const newTag = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];

        tagList.forEach((theTag, i) => {
            if (tag === theTag) {
                tag = newTag[i];
            }
        })

        return tag;
    }

    useEffect(() => {
        (async () => {
            try {
                let result = await fetch(`${proxy}${nomad}`);
                result = await result.json();

                result = result.map(element => {
                    element.stars = countStars(element);
                    return element;
                })
                setCafes(result);
            } catch (err) {
                console.log(err)
            };
        })();
    }, []);

    useEffect(() => {
        let queryResult = queryCafe(cafes);
        
        let start = nowPage * perpage;
        let end = (start + perpage) + nowPage * perpage;
        queryResult = ranking(queryResult);
        queryResult = setAmount(queryResult, start, end);

        setWantCafes(queryResult);
        // 要在hooks變化時重新render，不然會是初始的hook
    }, [cafes]);
    
    return (
        <div className='container'>
                {wantCafes.length !== 0 ? <div className="row flex-wrap"> 
                {wantCafes.map((cafe, i) => {
                    return (
                        <div className="col-md-4 col-sm-6 col-12 mb-3" key={cafe.id}>
                            <a href="" className='text-decoration-none'>
                            <div className="card h-100">
                                <img src={cafe.img ? cafe.img : "https://fakeimg.pl/350x200/?text=noPic"} alt={`${cafe.name} img`} className="card-img-top" />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-between">
                                        <div className="card-tilte fs-1-5 fw-bold">{cafe.name}</div>
                                        <ul className="d-flex list-unstyled">
                                            {(() => {
                                                const starArray = [];
                                                const fill = Math.round(cafe.stars);
                                                const empty = 5 - fill;
                                                for (let i = 0; i < fill; i++){
                                                    const starsFill = <li key={`${cafe.id} ${i}fillstar`}><i className="bi bi-star-fill fs-1-5 text-yellow"></i></li>
                                                    starArray.push(starsFill);
                                                };
                                                for (let i = 0; i < empty; i++){
                                                    const starEmpty = <li key={`${cafe.id} ${i}emptystar`}><i className="bi bi-star fs-1-5 text-gray"></i></li>
                                                    starArray.push(starEmpty);
                                                }
                                                return starArray;
                                            })()}
                                        </ul>
                                    </div>
                                        <ul className='d-flex list-unstyled'>{getTag(cafe).map((tag) => <li className='me-0-25 bg-gray-light rounded-pill px-0-75 py-0-25'>{ tag }</li>)}</ul>
                                </div>
                            </div>
                            </a>
                        </div>
                    )
                })}</div> : <p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>}
            
      </div>
    
  )
}
