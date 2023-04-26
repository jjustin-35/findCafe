import React from 'react';
import { useEffect, useState } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { Link } from 'react-router-dom';

import { Tag } from './Tag';
import { Stars } from './Stars';
import { Spinner } from './Spinner';

export const Board = (props) => {
  const { nowPage, perpage, pages, setPages, setNowPage } = props;
  const { search } = useGlobal().searchState;
  const { address, ...querys } = search;
  // address = {country, district, location, mrt}
  const queryUrl = process.env.REACT_APP_API_URL + '/cafe';
  const [cafes, setCafes] = useState([]);
  const [perCafe, setPerCafe] = useState([]);
  const [isData, setIsData] = useState(true);

  // function
  const isEmpty = (obj) => {
    for (let i in obj) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    let queryString = '';
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

    (async () => {
      try {
        let result = await fetch(queryUrl + '?' + queryString);
        result = await result.json();

        const { length, cafes } = result;

        if (cafes.length === 0) {
          setIsData(false);
        } else {
          setIsData(true);
        }
        setCafes(cafes);
        if (setPages) {
          setPages(length % perpage === 0 ? length / perpage : length / perpage + 1);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [search]);

  useEffect(() => {
    const start = 0 + nowPage * perpage;
    const end = start + perpage;
    const percafe = cafes.slice(start, end);

    setPerCafe(percafe);
  }, [search, nowPage, cafes]);

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
  };

  const handleAddress = (address) => {
    const { country, districts } = address;
    const newAddress = [country, districts];

    let str = '';
    newAddress.forEach((element, i) => {
      if (element === 'unknown') {
        element = '';
      } else if (i === 0) {
        element += ',';
      }
      str += element;
    });

    return str;
  };

  return (
    <div>
      {(() => {
        if (isData) {
          if (cafes.length === 0) {
            return (
              <div className="vh-100 d-flex justify-content-center align-items-center mb-3">
                <Spinner />
              </div>
            );
          } else {
            return (
              <div className="row flex-wrap">
                {perCafe.map((cafe, i) => {
                  return (
                    <div className="col-12 mb-1-5" key={cafe._id}>
                      <Link to={`/cafe/${cafe.name}`} className="text-decoration-none">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div
                                className={'card-tilte fw-bold me-0-5 ' + (cafe.name.length >= 10 ? 'fs-1' : 'fs-1-25')}
                              >
                                {cafe.name}
                              </div>
                              <Stars cafe={cafe} />
                            </div>
                            <p className="text-normal">{handleAddress(cafe.address)}</p>
                            <Tag cafe={cafe} className="fs-0-75 mb-0" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          }
        } else {
          return <p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>;
        }
      })()}
      {pages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item" key={'before page'}>
              <a href="" className="page-link" id="before" onClick={handlePage}>
                前一頁
              </a>
            </li>
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
                  pageControl = nowPage + 5 - ((nowPage + 5) % 5);
                }
              } else {
                pageControl = pages;
              }
              let list = [];
              for (let i = start + 1; i <= pageControl; i++) {
                list.push(
                  <li className={'page-item ' + (nowPage + 1 === i ? 'active' : '')} key={i + 'page'}>
                    <a className="page-link" href="" id={i} onClick={handlePage}>
                      {i}
                    </a>
                  </li>,
                );
              }

              return list;
            })()}
            <li className="page-item" key={'after page'}>
              <a href="" className="page-link" id="after" onClick={handlePage}>
                後一頁
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
