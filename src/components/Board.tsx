import React from 'react';
import { useEffect, useState } from 'react';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { Link } from 'react-router-dom';

// @ts-expect-error TS(6142): Module './Tag' was resolved to 'C:/Users/user/Desk... Remove this comment to see the full error message
import { Tag } from './Tag';
// @ts-expect-error TS(6142): Module './Stars' was resolved to 'C:/Users/user/De... Remove this comment to see the full error message
import { Stars } from './Stars';
// @ts-expect-error TS(6142): Module './Spinner' was resolved to 'C:/Users/user/... Remove this comment to see the full error message
import { Spinner } from './Spinner';

export const Board = (props: any) => {
  const { nowPage, perpage, pages, setPages, setNowPage } = props;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { search } = useGlobal().searchState;
  const { address, ...querys } = search;
  // address = {country, district, location, mrt}
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const queryUrl = process.env.REACT_APP_API_URL + '/cafe';
  const [cafes, setCafes] = useState([]);
  const [perCafe, setPerCafe] = useState([]);
  const [isData, setIsData] = useState(true);

  // function
  const isEmpty = (obj: any) => {
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

        // @ts-expect-error TS(2339): Property 'length' does not exist on type 'Response... Remove this comment to see the full error message
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
  const handlePage = (e: any) => {
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

  const handleAddress = (address: any) => {
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      {(() => {
        if (isData) {
          if (cafes.length === 0) {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="vh-100 d-flex justify-content-center align-items-center mb-3">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Spinner />
              </div>
            );
          } else {
            return (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="row flex-wrap">
                {perCafe.map((cafe, i) => {
                  return (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className="col-12 mb-1-5" key={cafe._id}>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <Link to={`/cafe/${cafe.name}`} className="text-decoration-none">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className="card h-100">
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <div className="card-body">
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="d-flex justify-content-between">
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <div
                                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                                className={'card-tilte fw-bold me-0-5 ' + (cafe.name.length >= 10 ? 'fs-1' : 'fs-1-25')}
                              >
                                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                                {cafe.name}
                              </div>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <Stars cafe={cafe} />
                            </div>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <p className="text-normal">{handleAddress(cafe.address)}</p>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          return <p className="text-normal fs-2 text-center justify-self-center">抱歉，目前找不到咖啡廳...</p>;
        }
      })()}
      {pages > 1 && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <nav aria-label="Page navigation">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ul className="pagination justify-content-center">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li className="page-item" key={'before page'}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <li className={'page-item ' + (nowPage + 1 === i ? 'active' : '')} key={i + 'page'}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <a className="page-link" href="" id={i} onClick={handlePage}>
                      {i}
                    </a>
                  </li>,
                );
              }

              return list;
            })()}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li className="page-item" key={'after page'}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
