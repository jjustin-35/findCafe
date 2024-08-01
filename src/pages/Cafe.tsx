import React from 'react';
import { useEffect, useState } from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router'. Did you mean to... Remove this comment to see the full error message
import { useParams } from 'react-router';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(6142): Module '../components/Board' was resolved to 'C:/U... Remove this comment to see the full error message
import { Board } from '../components/Board';
// @ts-expect-error TS(6142): Module '../components/Tag' was resolved to 'C:/Use... Remove this comment to see the full error message
import { Tag } from '../components/Tag';
// @ts-expect-error TS(6142): Module '../components/Stars' was resolved to 'C:/U... Remove this comment to see the full error message
import { Stars } from '../components/Stars';
// @ts-expect-error TS(6142): Module '../components/EditComment' was resolved to... Remove this comment to see the full error message
import { EditComment } from '../components/EditComment';

export const Cafe = () => {
  const [theCafe, setTheCafe] = useState({});
  const [address, setAddress] = useState({});
  const [time, setTime] = useState({});
  const [comment, setComment] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [isEdit, setIsEdit] = useState({ id: '' });
  const [isDelete, setIsDelete] = useState({});

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token } = useGlobal().auth;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { profile, setProfile, setNewInfo } = useGlobal().userInfo;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { search, setSearch } = useGlobal().searchState;
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const apiUrl = process.env.REACT_APP_API_URL;
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const local = process.env.PUBLIC_URL;

  const theName = useParams().cafeName;
  document.title = theName;

  useEffect(() => {
    const fetchCafe = async () => {
      let result = false;
      try {
        let res = await fetch(`${apiUrl}/cafe/${theName}`);
        res = await res.json();

        // @ts-expect-error TS(2339): Property 'address' does not exist on type 'Respons... Remove this comment to see the full error message
        const { address, time, ...cafe } = res;
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
        let res = await fetch(`${apiUrl}/comment/${theName}`);
        res = await res.json();

        // @ts-expect-error TS(2345): Argument of type 'Response' is not assignable to p... Remove this comment to see the full error message
        setComment(res);

        result = true;
      } catch (err) {
        console.log(err);
      }

      return result;
    };

    (async () => {
      await Promise.all([fetchCafe(), fetchComment()]);
    })();
  }, [theName]);

  useEffect(() => {
    const { myFav = [] } = profile;
    // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
    let [Fav] = myFav.filter((elem: any) => elem === theCafe._id);

    if (Fav) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [theCafe]);

  useEffect(() => {
    if (!isEmpty(profile)) {
      setNewInfo({ myFav: profile.myFav });
    }
  }, [isFav]);

  useEffect(() => {
    // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
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

      // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
      let newComment = comment.filter((element) => element._id !== isDelete._id);
      // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
      profile.comment = profile.comment.filter((element: any) => element._id !== isDelete._id);

      setComment(newComment);
    }
  }, [isDelete]);

  function isEmpty(obj: any) {
    for (let i in obj) {
      return false;
    }
    return true;
  }

  const handleMyFav = (e: any) => {
    e.preventDefault();

    if (!token) {
      return alert('請先登入');
    }

    setIsFav(!isFav);

    const { myFav = [] } = profile;
    const newProfile = { ...profile };
    if (!isFav) {
      // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
      newProfile.myFav = [...myFav, theCafe._id];
    } else {
      // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
      newProfile.myFav = myFav.filter((elem: any) => elem !== theCafe._id);
    }

    setProfile(newProfile);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="container py-5">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="row">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <section className="col-lg-8 col-12 mb-xl-0 mb-2">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="d-flex mb-2 flex-lg-nowrap flex-wrap">
              // @ts-expect-error TS(2339): Property 'photo' does not exist on type '{}'.
              {theCafe.photo ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img src={theCafe.photo[0]} alt="" className="title-img me-md-1 mb-md-0 mb-1" />
              ) : (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="title-img me-md-1 mb-md-0 mb-1 flex-shrink-0">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <img src={`${local}/img/no-cafe.svg`} alt="no picture" className="w-100 h-100" />
                </div>
              )}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <h2 className="fs-1-75 mb-1 me-1">
                  // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
                  {theCafe.name}{' '}
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <a href="" onClick={handleMyFav}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={'bi ' + (isFav ? 'bi-bookmark-fill text-red' : 'bi-bookmark text-black')}></span>
                  </a>
                </h2>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className="text-gray-500">
                  // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
                  {address.country || address.districts
                    // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
                    ? address.country + ',' + address.districts + ' ,' + address.mrt
                    : ''}
                </p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Stars cafe={theCafe} />
              </div>
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="d-flex mb-0-25 align-items-lg-center flex-wrap">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <iframe
                loading="lazy"
                className="me-md-1-25 mb-1 mb-lg-0 map"
                // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP}&q=${theCafe.name}&center=${address.latitude},${address.longitude}&zoom=15`}
              ></iframe>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>店家地址: {address.country + address.districts + address.location}</p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>有無限時: {theCafe.limited_time}</p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  網頁連結: <a href={theCafe.url}>{theCafe.name}</a>
                </p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p>店家電話: {theCafe.tel ? theCafe.tel : '無'}</p>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className="mb-0">營業時間: {time.open_time}</p>
              </div>
            </div>
            {/* tag */}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="mt-1 mb-1-5">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Tag cafe={theCafe} className={'fs-1'} />
            </div>
            {/* comment */}
            {comment.length != 0 ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div>
                {comment.map((aComment, idx) => {
                  // @ts-expect-error TS(2339): Property 'time' does not exist on type 'never'.
                  let date = new Date(aComment.time);

                  // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'Date'.
                  date = date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });

                  const handleEdit = (e: any) => {
                    e.preventDefault();
                    // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
                    setIsEdit({ id: aComment._id });
                  };

                  const handleDelete = async (e: any) => {
                    e.preventDefault();
                    // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
                    setIsDelete({ _id: aComment._id });
                  };
                  return (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div key={idx}>
                      // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
                      {!isEdit.id || !(isEdit.id === aComment._id) ? (
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <div className="d-flex justify-content-between align-items-start mb-1" key={aComment._id}>
                          // @ts-expect-error TS(2339): Property 'user' does not exist on type 'never'.
                          {aComment.user.thumbnail ? (
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="rounded-circle text-center nav-profile bg-white me-0-5">
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <img src={aComment.user.thumbnail} alt="" className="h-100" />
                            </div>
                          ) : (
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              fill="currentColor"
                              className="bi bi-person-circle me-1"
                              viewBox="0 0 16 16"
                            >
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                              />
                            </svg>
                          )}
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <div className="d-flex w-100 justify-content-between">
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <h4 className="fs-1-5 fw-bold">
                                // @ts-expect-error TS(2339): Property 'user' does not exist on type 'never'.
                                {aComment.user.name}
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <span className="ms-0-5 fs-1 text-light d-block d-md-inline">{date}</span>
                              </h4>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <div>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <p>{aComment.post}</p>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <Tag cafe={aComment} />
                              </div>
                            </div>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div>
                              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                              <Stars cafe={aComment} />

                              // @ts-expect-error TS(2339): Property 'user' does not exist on type 'never'.
                              {aComment.user.email === profile.email && (
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <div className=" text-end">
                                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                  <a href="" onClick={handleEdit}>
                                    編輯
                                  </a>
                                  ｜
                                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                  <a href="" onClick={handleDelete}>
                                    刪除
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <EditComment
                          method={'PATCH'}
                          // @ts-expect-error TS(2339): Property 'cafe' does not exist on type 'never'.
                          cafe={aComment.cafe}
                          // @ts-expect-error TS(2339): Property 'post' does not exist on type 'never'.
                          content={aComment.post}
                          // @ts-expect-error TS(2339): Property 'stars' does not exist on type 'never'.
                          theStar={aComment.stars}
                          // @ts-expect-error TS(2339): Property 'tags' does not exist on type 'never'.
                          theTags={aComment.tags}
                          setIsEdit={setIsEdit}
                          comment={comment}
                          setComment={setComment}
                          // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
                          theId={aComment._id}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className="fs-1 text-center text-light">留下第一筆留言!</p>
            )}
            {/* myComment */}
            {!token ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <p className="fs-1-5 text-gray text-center">
                請先
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link to="/login" className="text-blue">
                  登入
                </Link>
                再留言
              </p>
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <EditComment method="POST" cafe={theCafe} starSize="fs-1-5" />
            )}
          </section>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <section className="col-lg-4 col">{!isEmpty(search) && <Board nowPage={0} perpage={6} />}</section>
        </div>
      </div>
    </div>
  );
};
