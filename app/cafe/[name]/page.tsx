'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCafeData, fetchComments, toggleFavorite, deleteComment } from '@/redux/cafe';
import { getCafes } from '@/redux/search';
import { Board } from '@/components/Board';
import { Tag } from '@/components/Tag';
import { Stars } from '@/components/Stars';
import { EditComment } from '@/components/EditComment';
import Link from 'next/link';

export default function CafePage({ params }: { params: { name: string } }) {
  const [isEdit, setIsEdit] = useState<{ id: string }>({ id: '' });

  const dispatch = useAppDispatch();
  const { cafe, address, time, comments, isFav } = useAppSelector((state) => state.cafe);
  const { profile } = useAppSelector((state) => state.auth);
  const { cafes } = useAppSelector((state) => state.search);
  const local = process.env.NEXT_PUBLIC_URL;

  const { name } = params;

  useEffect(() => {
    dispatch(fetchCafeData(name));
    dispatch(fetchComments(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (address.country || address.districts) {
      dispatch(getCafes({ area: address.country, district: address.districts }));
    }
  }, [address, dispatch]);

  const handleMyFav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!profile) {
      return alert('請先登入');
    }

    dispatch(toggleFavorite());
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('確定要刪除嗎?')) {
      dispatch(deleteComment({ commentId, cafeName: name }));
    }
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <section className="col-lg-8 col-12 mb-xl-0 mb-2">
            <div className="d-flex mb-2 flex-lg-nowrap flex-wrap">
              {cafe.photo ? (
                <img src={cafe.photo[0]} alt="" className="title-img me-md-1 mb-md-0 mb-1" />
              ) : (
                <div className="title-img me-md-1 mb-md-0 mb-1 flex-shrink-0">
                  <img src={`${local}/img/no-cafe.svg`} alt="no picture" className="w-100 h-100" />
                </div>
              )}
              <div>
                <h2 className="fs-1-75 mb-1 me-1">
                  {cafe.name}{' '}
                  <a href="" onClick={handleMyFav}>
                    <span className={'bi ' + (isFav ? 'bi-bookmark-fill text-red' : 'bi-bookmark text-black')}></span>
                  </a>
                </h2>
                <p className="text-gray-500">
                  {address.country || address.districts
                    ? address.country + ',' + address.districts + ' ,' + address.mrt
                    : ''}
                </p>
                <Stars cafe={cafe} />
              </div>
            </div>
            <div className="d-flex mb-0-25 align-items-lg-center flex-wrap">
              <iframe
                loading="lazy"
                className="me-md-1-25 mb-1 mb-lg-0 map"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAP}&q=${cafe.name}&center=${address.latitude},${address.longitude}&zoom=15`}
              ></iframe>
              <div>
                <p>店家地址: {address.country + address.districts + address.location}</p>
                <p>有無限時: {cafe.limited_time}</p>
                <p>
                  網頁連結: <a href={cafe.url}>{cafe.name}</a>
                </p>
                <p>店家電話: {cafe.tel ? cafe.tel : '無'}</p>
                <p className="mb-0">營業時間: {time.open_time}</p>
              </div>
            </div>
            <div className="mt-1 mb-1-5">
              <Tag cafe={cafe} className={'fs-1'} />
            </div>
            {comments.length !== 0 ? (
              <div>
                {comments.map((aComment) => {
                  const date = new Date(aComment.time).toLocaleDateString();
                  const handleEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsEdit({ id: aComment._id });
                  };

                  return (
                    <div key={aComment._id} className="mb-1 pb-1 border-bottom">
                      {isEdit.id !== aComment._id ? (
                        <div>
                          {aComment.user.thumbnail && (
                            <img
                              src={aComment.user.thumbnail}
                              alt=""
                              className="rounded-circle object-fit-cover mb-0-5"
                              width="50"
                              height="50"
                            />
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
                                  <a href="" onClick={() => handleDelete(aComment._id)}>
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
                          comment={comments}
                          setComment={(newComments) => dispatch(fetchComments(name))}
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
            {!profile ? (
              <p className="fs-1-5 text-gray text-center">
                請先
                <Link href="/login" className="text-blue">
                  登入
                </Link>
                再留言
              </p>
            ) : (
              <EditComment method="POST" cafe={cafe} starSize="fs-1-5" />
            )}
          </section>
          <section className="col-lg-4 col">
            {Object.keys(cafes).length > 0 && <Board nowPage={0} perpage={6} />}
          </section>
        </div>
      </div>
    </div>
  );
}
