import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobal } from '../redux/GlobalProvider';
import { Board } from '../components/Board';
import { Tag } from '../components/Tag';
import { Stars } from '../components/Stars';
import { EditComment } from '../components/EditComment';

interface Address {
  country: string;
  districts: string;
  mrt: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface Time {
  open_time: string;
}

interface Cafe {
  _id: string;
  name: string;
  photo?: string[];
  limited_time: string;
  url: string;
  tel?: string;
}

interface Comment {
  _id: string;
  user: {
    name: string;
    email: string;
    thumbnail?: string;
  };
  time: string;
  post: string;
  cafe: string;
  stars: number;
  tags: string[];
}

interface Profile {
  email: string;
  myFav: string[];
  comment: Comment[];
}

export const Cafe: React.FC = () => {
  const [theCafe, setTheCafe] = useState<Cafe>({} as Cafe);
  const [address, setAddress] = useState<Address>({} as Address);
  const [time, setTime] = useState<Time>({} as Time);
  const [comment, setComment] = useState<Comment[]>([]);
  const [isFav, setIsFav] = useState(false);
  const [isEdit, setIsEdit] = useState<{ id: string }>({ id: '' });
  const [isDelete, setIsDelete] = useState<{ _id?: string }>({});

  const { token } = useGlobal().auth;
  const { profile, setProfile, setNewInfo } = useGlobal().userInfo;
  const { search, setSearch } = useGlobal().searchState;
  const apiUrl = process.env.REACT_APP_API_URL;
  const local = process.env.PUBLIC_URL;

  const { cafeName } = useParams<{ cafeName: string }>();
  document.title = cafeName || '';

  useEffect(() => {
    const fetchCafe = async () => {
      let result = false;
      try {
        let res = await fetch(`${apiUrl}/cafe/${cafeName}`);
        let data = await res.json();

        const { address, time, ...cafe } = data;
        const { country, districts } = address;

        const newAddress = { ...address };
        newAddress.country = newAddress.country !== 'unknown' ? newAddress.country : '';
        newAddress.districts = newAddress.districts !== 'unknown' ? newAddress.districts : '';

        setAddress(newAddress);
        setSearch({ address: { country, districts } });
        setTime(time);
        setTheCafe(cafe);

        result = true;
      } catch (err) {
        console.log(err);
      }

      return result;
    };

    const fetchComment = async () => {
      let result = false;
      try {
        let res = await fetch(`${apiUrl}/comment/${cafeName}`);
        let data = await res.json();

        setComment(data);

        result = true;
      } catch (err) {
        console.log(err);
      }

      return result;
    };

    (async () => {
      await Promise.all([fetchCafe(), fetchComment()]);
    })();
  }, [cafeName]);

  useEffect(() => {
    const { myFav = [] } = profile;
    let [Fav] = myFav.filter((elem: string) => elem === theCafe._id);

    if (Fav) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [theCafe, profile]);

  useEffect(() => {
    if (!isEmpty(profile)) {
      setNewInfo({ myFav: profile.myFav });
    }
  }, [isFav, profile, setNewInfo]);

  useEffect(() => {
    if (isDelete._id) {
      (async () => {
        await fetch(apiUrl + '/comment/set', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(isDelete),
        });
      })();

      let newComment = comment.filter((element) => element._id !== isDelete._id);
      profile.comment = profile.comment.filter((element: Comment) => element._id !== isDelete._id);

      setComment(newComment);
    }
  }, [isDelete, apiUrl, token, comment, profile]);

  function isEmpty(obj: any): boolean {
    for (let i in obj) {
      return false;
    }
    return true;
  }

  const handleMyFav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!token) {
      return alert('請先登入');
    }

    setIsFav(!isFav);

    const { myFav = [] } = profile;
    const newProfile = { ...profile };
    if (!isFav) {
      newProfile.myFav = [...myFav, theCafe._id];
    } else {
      newProfile.myFav = myFav.filter((elem: string) => elem !== theCafe._id);
    }

    setProfile(newProfile);
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <section className="col-lg-8 col-12 mb-xl-0 mb-2">
            <div className="d-flex mb-2 flex-lg-nowrap flex-wrap">
              {theCafe.photo ? (
                <img src={theCafe.photo[0]} alt="" className="title-img me-md-1 mb-md-0 mb-1" />
              ) : (
                <div className="title-img me-md-1 mb-md-0 mb-1 flex-shrink-0">
                  <img src={`${local}/img/no-cafe.svg`} alt="no picture" className="w-100 h-100" />
                </div>
              )}
              <div>
                <h2 className="fs-1-75 mb-1 me-1">
                  {theCafe.name}{' '}
                  <a href="" onClick={handleMyFav}>
                    <span className={'bi ' + (isFav ? 'bi-bookmark-fill text-red' : 'bi-bookmark text-black')}></span>
                  </a>
                </h2>
                <p className="text-gray-500">
                  {address.country || address.districts
                    ? address.country + ',' + address.districts + ' ,' + address.mrt
                    : ''}
                </p>
                <Stars cafe={theCafe} />
              </div>
            </div>
            <div className="d-flex mb-0-25 align-items-lg-center flex-wrap">
              <iframe
                loading="lazy"
                className="me-md-1-25 mb-1 mb-lg-0 map"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP}&q=${theCafe.name}&center=${address.latitude},${address.longitude}&zoom=15`}
              ></iframe>
              <div>
                <p>店家地址: {address.country + address.districts + address.location}</p>
                <p>有無限時: {theCafe.limited_time}</p>
                <p>
                  網頁連結: <a href={theCafe.url}>{theCafe.name}</a>
                </p>
                <p>店家電話: {theCafe.tel ? theCafe.tel : '無'}</p>
                <p className="mb-0">營業時間: {time.open_time}</p>
              </div>
            </div>
            {/* tag */}
            <div className="mt-1 mb-1-5">
              <Tag cafe={theCafe} className={'fs-1'} />
            </div>
            {/* comment */}
            {comment.length != 0 ? (
              <div>
                {comment.map((aComment, idx) => {
                  let date = new Date(aComment.time);

                  date = date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });

                  const handleEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsEdit({ id: aComment._id });
                  };

                  const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsDelete({ _id: aComment._id });
                  };
                  return (
                    <div key={idx}>
                      {!isEdit.id || !(isEdit.id === aComment._id) ? (
                        <div className="d-flex justify-content-between align-items-start mb-1" key={aComment._id}>
                          {aComment.user.thumbnail ? (
                            <div className="rounded-circle text-center nav-profile bg-white me-0-5">
                              <img src={aComment.user.thumbnail} alt="" className="h-100" />
                            </div>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              fill="currentColor"
                              className="bi bi-person-circle me-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                              <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                              />
                            </svg>
                          )}
                          <div className="d-flex w-100 justify-content-between">
                            <div>
                              <h4 className="fs-1-5 fw-bold">
                                {aComment.user.name}
                                <span className="ms-0-5 fs-1 text-light d-block d-md-inline">{date}</span>
                              </h4>
                              <div>
                                <p>{aComment.post}</p>
                                <Tag cafe={aComment} />
                              </div>
                            </div>
                            <div>
                              <Stars cafe={aComment} />

                              {aComment.user.email === profile.email && (
                                <div className=" text-end">
                                  <a href="" onClick={handleEdit}>
                                    編輯
                                  </a>
                                  ｜
                                  <a href="" onClick={handleDelete}>
                                    刪除
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <EditComment
                          method={'PATCH'}
                          cafe={aComment.cafe}
                          content={aComment.post}
                          theStar={aComment.stars}
                          theTags={aComment.tags}
                          setIsEdit={setIsEdit}
                          comment={comment}
                          setComment={setComment}
                          theId={aComment._id}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="fs-1 text-center text-light">留下第一筆留言!</p>
            )}
            {/* myComment */}
            {!token ? (
              <p className="fs-1-5 text-gray text-center">
                請先
                <Link to="/login" className="text-blue">
                  登入
                </Link>
                再留言
              </p>
            ) : (
              <EditComment method="POST" cafe={theCafe} starSize="fs-1-5" />
            )}
          </section>
          <section className="col-lg-4 col">{!isEmpty(search) && <Board nowPage={0} perpage={6} />}</section>
        </div>
      </div>
    </div>
  );
};
