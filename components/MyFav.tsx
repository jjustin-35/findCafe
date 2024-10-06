  import React, { useState, useEffect } from 'react';
  import { useSelector } from 'react-redux';
  import { RootState } from '@/config/configureStore';
  import { Stars } from './Stars';
  import { Tag } from './Tag';
  import { Link } from 'react-router-dom';
  import { Spinner } from './Spinner';

  interface Cafe {
    _id: string;
    name: string;
    address: {
      country: string;
      districts: string;
    };
  }

  const MyFav: React.FC = () => {
    const localUrl = process.env.PUBLIC_URL;
    const apiUrl = process.env.REACT_APP_API_URL;
    const { profile } = useSelector((state: RootState) => state.user);
    const [theFav, setTheFav] = useState<Cafe[]>([]);
    const [loading, setLoading] = useState(false);
    const { myFav = [] } = profile;

    useEffect(() => {
      setLoading(true);
      (async () => {
        if (myFav.length !== 0) {
          const condition = myFav.map(fav => `_id=${fav}`).join('&');
          const res = await fetch(`${apiUrl}/cafe?${condition}`);
          const data = await res.json();
          setTheFav(data.cafes);
        }
        setLoading(false);
      })();
    }, [myFav, apiUrl]);

    const handleAddress = (address: { country: string; districts: string }): string => {
      const { country, districts } = address;
      return [country, districts]
        .map((element, i) => element === 'unknown' ? '' : i === 0 ? `${element},` : element)
        .join('');
    };

    return (
      <div className="row flex-wrap">
        {loading ? (
          <div className="d-flex justify-content-center mb-3">
            <Spinner />
          </div>
        ) : (
          <div>
            {theFav.length === 0 ? (
              <div className="text-center">
                <p className="fs-2 mb-4 mt-3 text-primary text-center">這裡還沒有東西喔!</p>
                <img src={`${localUrl}/img/profile-default.svg`} alt="nothing here" className="w-30" />
              </div>
            ) : (
              <div>
                {theFav.map((cafe) => (
                  <div className="col-12 mb-1-5" key={cafe._id}>
                    <Link to={`/cafe/${cafe.name}`} className="text-decoration-none">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="card-tilte fs-1-5 fw-bold">
                              {cafe.name} <span className="bi bi-bookmark-fill text-red ms-0-25"></span>
                            </div>
                            <Stars cafe={cafe} />
                          </div>
                          <p className="text-normal">{handleAddress(cafe.address)}</p>
                          <Tag cafe={cafe} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  export default MyFav;
