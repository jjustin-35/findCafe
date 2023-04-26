import React from 'react';
import { useState } from 'react';
import { useGlobal } from '../context/GlobalProvider';
import { useForm } from 'react-hook-form';

import { Message } from './Message';

export const EditComment = ({
  method,
  cafe,
  content = '',
  theStar,
  theTags,
  theId = undefined,
  starSize = 'fs-1-25',
  setIsEdit,
  comment = [],
  setComment,
}) => {
  const { profile, setProfile } = useGlobal().userInfo;
  const { token } = useGlobal().auth;
  const apiUrl = process.env.REACT_APP_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [stars, setStars] = useState(theStar ? theStar : 0);
  const [hoverStar, setHoverStar] = useState(0);
  const [tagContent, setTagContent] = useState('');
  const [tags, setTags] = useState(theTags ? [...theTags] : []);
  const [err, setErr] = useState('');

  const handleStar = (e) => {
    e.preventDefault();
    setStars(e.target.id);
  };

  const handleTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTags([...tags, tagContent]);
      setTagContent('');
    } else if (e.key === 'Backspace' && tagContent === '') {
      let newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const onSubmit = async (data) => {
    data._id = theId;
    data.cafe = cafe._id ? cafe._id : cafe;
    data.user = { name: profile.name, email: profile.email };
    data.time = Date.now();
    data.tags = tags;
    data.stars = stars;

    const newProfile = { ...profile };
    newProfile.comment.push(data);
    setProfile(newProfile);

    if (stars === 0) {
      return setErr('請輸入星星!');
    }

    const result = await fetch(apiUrl + `/comment/set`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      method,
      body: JSON.stringify(data),
    });

    let newComments = comment.map((c) => {
      if (c._id && c._id === theId) {
        c = data;
      }
      return c;
    });

    setComment(newComments);
    if (setIsEdit) {
      setIsEdit(false);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between mb-1">
        <div className="d-flex align-items-center">
          {profile.thumbnail ? (
            <div className="rounded-circle text-center nav-profile bg-white me-0-25">
              <img src={profile.thumbnail} alt="" className="h-100" />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
          <h4 className="fs-1-5 mb-0">{profile.name}</h4>
        </div>
        <div>
          <a
            className={
              'bi bi-star-fill text-light hover hover-text-yellow ' +
              starSize +
              (stars >= 1 ? ' text-yellow' : '') +
              (hoverStar >= 1 ? ' text-yellow' : '')
            }
            onClick={handleStar}
            onMouseEnter={(e) => {
              setHoverStar(e.target.id);
            }}
            id="1"
          ></a>
          <a
            className={
              'bi bi-star-fill text-light hover hover-text-yellow ' +
              starSize +
              (stars >= 2 ? ' text-yellow' : '') +
              (hoverStar >= 2 ? ' text-yellow' : '')
            }
            onClick={handleStar}
            onMouseEnter={(e) => {
              setHoverStar(e.target.id);
            }}
            id="2"
          ></a>
          <a
            className={
              'bi bi-star-fill text-light hover hover-text-yellow ' +
              starSize +
              (stars >= 3 ? ' text-yellow' : '') +
              (hoverStar >= 3 ? ' text-yellow' : '')
            }
            onClick={handleStar}
            onMouseEnter={(e) => {
              setHoverStar(e.target.id);
            }}
            id="3"
          ></a>
          <a
            className={
              'bi bi-star-fill text-light hover hover-text-yellow ' +
              starSize +
              (stars >= 4 ? ' text-yellow' : '') +
              (hoverStar >= 4 ? ' text-yellow' : '')
            }
            onClick={handleStar}
            onMouseEnter={(e) => {
              setHoverStar(e.target.id);
            }}
            id="4"
          ></a>
          <a
            className={
              'bi bi-star-fill text-light hover hover-text-yellow ' +
              starSize +
              (stars >= 5 ? ' text-yellow' : '') +
              (hoverStar >= 5 ? ' text-yellow' : '')
            }
            onClick={handleStar}
            onMouseEnter={(e) => {
              setHoverStar(e.target.id);
            }}
            id="5"
          ></a>
        </div>
      </div>
      <div className="mb-1-5">
        <div className="border rounded-1 border-light d-flex align-items-center mb-0-25 px-0-5">
          {tags.map((tag) => {
            return (
              <span className="me-0-5 badge rounded-pill px-0-5 bg-light">
                {tag}
                <i className="bi bi-cross"></i>
              </span>
            );
          })}
          <input
            type="text"
            placeholder="tag..."
            className="form-control border-0 w-100 shadow-none"
            onChange={(e) => {
              setTagContent(e.target.value);
            }}
            onKeyDown={handleTag}
            value={tagContent}
          />
        </div>
        <p className="text-normal">請按enter鍵輸入標籤，backspace鍵刪除標籤</p>
        <textarea
          rows={5}
          placeholder="留言..."
          className="form-control"
          defaultValue={content}
          {...register('post', {
            required: {
              value: true,
              message: '請留言',
            },
          })}
        />
        <Message err={errors.message?.comment} />
        <Message err={err} />
      </div>
      {method === 'POST' ? (
        <button className="btn btn-primary px-1-5 py-0-5">留言</button>
      ) : (
        <div>
          <button className="btn btn-primary px-1-5 py-0-5 mb-1 me-1">修改</button>
          <button
            className="btn btn-outline-primary px-1-5 py-0-5 mb-1"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit({ id: '', state: false });
            }}
          >
            取消
          </button>
        </div>
      )}
    </form>
  );
};
