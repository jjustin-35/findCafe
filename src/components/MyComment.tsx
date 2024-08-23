import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../redux/search';
import { Stars } from './Stars';
import { Tag } from './Tag';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';

interface Comment {
  _id: string;
  cafe: {
    _id: string;
    name: string;
    address: {
      country: string;
      districts: string;
    };
  };
  time: string;
  post: string;
}

interface Profile {
  comment?: Comment[];
}

export const MyComment: React.FC = () => {
  const localUrl = process.env.PUBLIC_URL;
  const apiUrl = process.env.REACT_APP_API_URL;
  const { profile } = useGlobal().userInfo as { profile: Profile };
  const [theComment, setTheComment] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const { comment = [] } = profile;

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (comment.length !== 0) {
        let condition = comment.map(c => `_id=${c.cafe._id || c.cafe}`).join('&');
        let res = await fetch(`${apiUrl}/cafe?${condition}`);
        let data = await res.json();

        const cafes = data.cafes;
        const updatedComments = comment.map(c => {
          const cafe = cafes.find(cafe => cafe._id === (c.cafe._id || c.cafe));
          return { ...c, cafe };
        });

        setTheComment(updatedComments);
        setLoading(false);
      }
    })();
  }, [comment, apiUrl]);

  const handleAddress = (address: { country: string; districts: string }) => {
    const { country, districts } = address;
    const newAddress = [country, districts];

    return newAddress.map((element, i) => 
      element === 'unknown' ? '' : i === 0 ? `${element},` : element
    ).join('');
  };

  return (
    <div className="row flex-wrap">
      {loading ? (
        <div className="d-flex justify-content-center mb-3">
          <Spinner />
        </div>
      ) : (
        <div>
          {theComment.length === 0 ? (
            <div className="text-center">
              <p className="fs-2 mb-4 mt-3 text-primary text-center">這裡還沒有東西喔!</p>
              <img src={`${localUrl}/img/profile-default.svg`} alt="nothing here" className="w-30" />
            </div>
          ) : (
            <div>
              {theComment.map((comment) => {
                const { cafe } = comment;
                const date = new Date(comment.time).toLocaleDateString();
                return (
                  <div className="col-12 mb-1-5" key={`${cafe._id}-${comment._id}`}>
                    <Link to={`/cafe/${cafe.name}`} className="text-decoration-none">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="card-tilte fs-1-5 fw-bold">
                              {cafe.name} <span className="ms-0-5 fs-1 text-normal">{date}</span>
                            </div>
                            <Stars cafe={comment} />
                          </div>
                          <p className="text-normal">{handleAddress(cafe.address)}</p>
                          <p>{comment.post}</p>
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
      )}
    </div>
  );
};