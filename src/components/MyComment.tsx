import React, { useState } from 'react';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(6142): Module './Stars' was resolved to 'C:/Users/user/De... Remove this comment to see the full error message
import { Stars } from './Stars';
// @ts-expect-error TS(6142): Module './Tag' was resolved to 'C:/Users/user/Desk... Remove this comment to see the full error message
import { Tag } from './Tag';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// @ts-expect-error TS(6142): Module './Spinner' was resolved to 'C:/Users/user/... Remove this comment to see the full error message
import { Spinner } from './Spinner';

export const MyComment = () => {
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const localUrl = process.env.PUBLIC_URL;
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const apiUrl = process.env.REACT_APP_API_URL;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { profile } = useGlobal().userInfo;
  const [theComment, setTheComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const { comment = [] } = profile;

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (comment.length !== 0) {
        let condition = '';
        for (let aComment of comment) {
          if (!aComment.cafe._id) {
            condition += `_id=${aComment.cafe}&`;
          } else {
            condition += `_id=${aComment.cafe._id}&`;
          }
        }
        console.log(condition);
        let res = await fetch(`${apiUrl}/cafe?${condition}`);
        res = await res.json();

        // @ts-expect-error TS(2339): Property 'cafes' does not exist on type 'Response'... Remove this comment to see the full error message
        const cafes = res.cafes;
        for (let cafe of cafes) {
          for (let aComment of comment) {
            if (aComment.cafe === cafe._id) {
              aComment.cafe = cafe;
            }
          }
        }

        setTheComment(comment);
        setLoading(false);
      }
    })();
  }, [comment]);

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
    <div className="row flex-wrap">
      {(() => {
        if (loading) {
          return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="d-flex justify-content-center mb-3">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Spinner />
            </div>
          );
        } else {
          return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              {theComment.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="text-center">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <p className="fs-2 mb-4 mt-3 text-primary text-center">這裡還沒有東西喔!</p>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <img src={`${localUrl}/img/profile-default.svg`} alt="nothing here" className="w-30" />
                </div>
              ) : (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div>
                  {theComment.map((comment, i) => {
                    const { cafe } = comment;
                    // @ts-expect-error TS(2339): Property 'time' does not exist on type 'never'.
                    let date = new Date(comment.time);
                    // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'Date'.
                    date = date.toLocaleDateString();
                    return (
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className="col-12 mb-1-5" key={`${cafe._id}-${comment._id}`}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Link to={`/cafe/${cafe.name}`} className="text-decoration-none">
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <div className="card h-100">
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="card-body">
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <div className="d-flex justify-content-between">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <div className="card-tilte fs-1-5 fw-bold">
                                  // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                                  {cafe.name} <span className="ms-0-5 fs-1 text-normal">{date}</span>
                                </div>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <Stars cafe={comment} />
                              </div>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <p className="text-normal">{handleAddress(cafe.address)}</p>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <p>{comment.post}</p>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <Tag cafe={comment} />
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      })()}
    </div>
  );
};
