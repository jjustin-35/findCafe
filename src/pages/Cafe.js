import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import { Board } from '../components/Board';

export const Cafe = () => {
  const [theCafe, setTheCafe] = useState({});
  const [address, setAddress] = useState({});
  const [time, setTime] = useState({});
  const [tagContent, setTagContent] = useState("");
  const [tags, setTags] = useState([]);
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [comment, setComment] = useState([]);

  const { token } = useGlobal().auth;
  const { profile } = useGlobal().userInfo;
  const { search, setSearch } = useGlobal().searchState;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const apiUrl = process.env.REACT_APP_API_URL2;
  const local = process.env.PUBLIC_URL; 

  const theName = useParams().cafeName;
  document.title = theName;

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        let res = await fetch(`${apiUrl}/cafe/${theName}`);
        res = await res.json();

        const { address, time, ...cafe } = res;
        const { country, districts } = address;

        setAddress(address);
        setSearch({ address: { country, districts } });
        setTime(time);
        setTheCafe(cafe);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchComment = async () => {
      let res = await fetch(`${apiUrl}/comment/${theName}`);
      res = res.json();

      setComment(res);
    }

    (async () => {
      await Promise.all([fetchCafe(), fetchComment()]);
    })()
  }, [])

  function isEmpty(obj) {
    for (let i in obj) {
      return false;
    }
    return true;
  }

  if (!isEmpty(theCafe)) {
    const { address } = theCafe;

    console.log(address);
  }

  const handleStar = (e) => {
    e.preventDefault();
    setStars(e.target.id);
  }

  const handleTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTags([...tags, tagContent])
      setTagContent("");
    } else if (e.key === "Backspace") {
      let newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  }

  const onSubmit = (data) => {
    data.tags = tags;
    setComment(data.comment);
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <section className="col-xl-9 col-lg-8 col-12 mb-xl-0 mb-2">
            <div className="d-flex mb-2 flex-wrap">
              {theCafe.photo ? <img src={theCafe.photo[0]} alt="" className='title-img me-md-1' /> : <div className='title-img me-md-1'><img src={`${local}/img/noPic.png`} alt="no picture" className='w-100 h-100'/></div>}
              <div>
                <h2 className="fs-2 mb-1">{theCafe.name} <span className="bi bi-bookmark"></span></h2>
                <p className="text-gray-500">{ address.country + "," + address.districts + " ," + address.mrt }</p>
                <ul className="d-flex list-unstyled">
                    {(() => {
                        const starArray = [];
                        const fill = Math.round(theCafe.stars);
                        const empty = 5 - fill;
                        for (let i = 0; i < fill; i++){
                            const starsFill = <li key={`${theCafe._id} ${i}fillstar`}><i className="bi bi-star-fill fs-1-5 text-yellow"></i></li>
                            starArray.push(starsFill);
                        };
                        for (let i = 0; i < empty; i++){
                            const starEmpty = <li key={`${theCafe._id} ${i}emptystar`}><i className="bi bi-star fs-1-5 text-gray-500"></i></li>
                            starArray.push(starEmpty);
                        }
                        return starArray;
                    })()}
                </ul>
              </div>
            </div>
            <div className="d-flex mb-0-25 align-items-lg-center flex-wrap">
              <iframe
                loading="lazy"
                className='me-md-1 mb-1 mb-lg-0 map'
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_MAP}&q=${theCafe.name}&center=${address.latitude},${address.longitude}&zoom=15`}></iframe>
              <div>
                <p>店家地址: {address.country + address.districts + address.location }</p>
                <p>有無限時: { theCafe.limited_time }</p>
                <p>網頁連結: <a href={theCafe.url}>{ theCafe.name }</a></p>
                <p>店家電話: { theCafe.tel ? theCafe.tel : "無" }</p>
                <p className='mb-0'>營業時間: { time.open_time }</p>
              </div>
            </div>
            {/* tag */}
            <div className='mb-1-5'>
              <span className='badge rounded-pill bg-light'>tag</span>
            </div>
            {/* comment */}
            {theCafe.comment.length !== 0 ? <div>
              <div className="d-flex justify-content-between">
                <img src="" alt="" className="rounded-circle me-1" height="50" width="50" />
                <div className="d-flex w-100 justify-content-between">
                  <div>
                    <h4 className="fs-1-5 fw-bold">userName <span className='fs-1 text-light d-block d-md-inline'>time</span></h4>
                    <div>
                      <p>content</p>
                      <img src="" alt="" />
                    </div>
                  </div>
                  <ul className="d-flex list-unstyled">
                    {(() => {
                        const starArray = [];
                        const fill = Math.round(theCafe.stars);
                        const empty = 5 - fill;
                        for (let i = 0; i < fill; i++){
                            const starsFill = <li key={`${theCafe._id} ${i}fillstar`}><i className="bi bi-star-fill fs-1-5 text-yellow"></i></li>
                            starArray.push(starsFill);
                        };
                        for (let i = 0; i < empty; i++){
                            const starEmpty = <li key={`${theCafe._id} ${i}emptystar`}><i className="bi bi-star-fill fs-1-5 text-light"></i></li>
                            starArray.push(starEmpty);
                        }
                        return starArray;
                    })()}
                </ul>
                </div>
              </div>
            </div> : <p className="fs-1 text-center text-light">留下第一筆留言!</p>}
            {/* myComment */}
            {!token ? <p className="fs-1-5 text-gray text-center">請先<Link to="/login" className="text-blue">登入</Link>再留言</p> : <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between mb-1">
                <div className="d-flex align-items-center">
                {profile.thumbnail ? <img src={profile.thumbnail} alt="" className='rounded-circle me-1' width="50" height="50"/> : <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle me-1" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" /></svg>}
                  <h4 className="fs-2">{profile.name}</h4>
                </div>
                <div>
                  <a className={'bi bi-star-fill text-light fs-1-5 hover hover-text-yellow' + (stars >= 1 ? " text-yellow" : "") + (hoverStar >= 1 ? " text-yellow" : "")} onClick={handleStar} onMouseEnter={(e)=>{setHoverStar(e.target.id)}} id="1"></a>
                  <a className={'bi bi-star-fill text-light fs-1-5 hover hover-text-yellow' + (stars >= 2 ? " text-yellow" : "") + (hoverStar >= 2 ? " text-yellow" : "")} onClick={handleStar} onMouseEnter={(e)=>{setHoverStar(e.target.id)}} id="2"></a>
                  <a className={'bi bi-star-fill text-light fs-1-5 hover hover-text-yellow' + (stars >= 3 ? " text-yellow" : "") + (hoverStar >= 3 ? " text-yellow" : "")} onClick={handleStar} onMouseEnter={(e)=>{setHoverStar(e.target.id)}} id="3"></a>
                  <a className={'bi bi-star-fill text-light fs-1-5 hover hover-text-yellow' + (stars >= 4 ? " text-yellow" : "") + (hoverStar >= 4 ? " text-yellow" : "")} onClick={handleStar} onMouseEnter={(e)=>{setHoverStar(e.target.id)}} id="4"></a>
                  <a className={'bi bi-star-fill text-light fs-1-5 hover hover-text-yellow' + (stars >= 5 ? " text-yellow" : "") + (hoverStar >= 5 ? " text-yellow" : "")} onClick={handleStar} onMouseEnter={(e)=>{setHoverStar(e.target.id)}} id="5"></a>
                </div>
              </div>
              <div className="mb-1-5">
                <div className="border rounded-1 border-light d-flex align-items-center mb-0-25 px-0-5">
                  {tags.map((tag) => {
                    return <span className='me-0-5 badge rounded-pill px-0-5 bg-light'>{ tag }<i className="bi bi-cross"></i></span>
                  })}
                  <input type="text" placeholder='tag...' className='form-control border-0 w-100 shadow-none' onChange={(e) => { setTagContent(e.target.value) }} onKeyDown={handleTag} value={tagContent } />
                </div>
                <p className='text-normal'>請按enter鍵輸入標籤，backspace鍵刪除標籤</p>
              <textarea rows={5} placeholder='留言...' className='form-control' {...register('comment',{
                  required: {
                  value: true, message: "請留言"
                  },
                })} />
                <Message err={errors.message?.comment} />
              </div>
              <button className="btn btn-primary px-1-5 py-0-5">留言</button>
            </form>}
          </section>
          <section className="col-xl-3 col-lg-4 col">
            {!isEmpty(search) && <Board nowPage={0} perpage={6} />}
          </section>
        </div>
        </div>
    </div>
  )
}
