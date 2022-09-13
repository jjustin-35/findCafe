import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { useGlobal } from '../context/GlobalProvider';
import { useForm, FormProvider } from 'react-hook-form';

import { Address } from '../components/Address';
import { Message } from '../components/Message';

export const Profile = () => {
    document.title = "找找咖啡 | 註冊"
    const localUrl = process.env.PUBLIC_URL;
    const [current, setCurrent] = useState('myFavorite');
    const [isEdit, setIsEdit] = useState(false);
    const [img, setImg] = useState(null);
    const { profile, setProfile } = useGlobal().userInfo;
    let { address = null, thumbnail = null, email, name } = profile;
    address = address ? address.country + address.districts : null;

    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;

    useEffect(() => {
        const tabs = document.querySelectorAll('.nav-link');

        tabs.forEach(tab => {
            if (tab.id === current) {
                tab.classList.add('acitve');
            } else {
                tab.classList.remove('active');
            }
        })
    }, [current]);

    const onEdit = () => {
        setIsEdit(true);
    }

    const onSubmit = (data) => {
        let info = { ...profile };
        for (let i in data) {
            if (i) {
                info[i] = data[i];
            }
        }

        setProfile(info);
        setIsEdit(false);
    }
    
    const handleTab = (e) => {
        setCurrent(e.target.id);
    }
  return (
      <div className='py-3'>
          {!isEdit ? <div className="container d-flex align-items-center mb-3">
            <img src={thumbnail ? thumbnail : `${localUrl}/img/blank-profile-picture.png`} alt="" className="rounded-circle me-2" width="150" height="150" />
            <div>
              <div className="h2 fs-2 fw-bold">{name}</div>
                {address && <p>{address}</p>}
                  <p>{ email }</p>
                  <div>
                      <button className="btn btn-outline-primary" onClick={onEdit}>編輯個人資料</button>
                      <button className="btn btn-outline-primary">修改密碼</button>
                  </div>
            </div>
          </div> : (
                  <div className="container d-flex mb-3">
                      <form action="" className='w-20 d-flex' onSubmit={handleSubmit(onSubmit)}>
                          <label className='rounded-circle w-fit h-fit position-relative me-2 pointer'>
                              <img src={thumbnail ? thumbnail : `${localUrl}/img/blank-profile-picture.png`} alt="" className="rounded-circle" width="150" height="150" />
                              <div className="bg-black opacity-50 rounded-circle position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center">
                                  <p className="mb-0 text-white">編輯圖片</p>
                              </div>
                              <input type="file" className='d-none'/>
                          </label>
                          <div className='mt-1-5'>
                            <input type="text" className="form-control" value={name} {...register('name', {
                                required: {value: true, message: '請輸入姓名'}
                            })} />
                            <FormProvider {...methods}>
                                <Address labelClass='d-none'/>
                            </FormProvider>
                            <input type="email" className="form-control" value={email} {...register('email', {
                                required: { value: true, message: "請輸入email" },
                                pattern: { value: /[@]+/, message: '格式錯誤' },
                            })} />

                            {(() => {
                                const list = [];
                                for (let field in errors) {
                                    list.push(<Message err={ field.message } />);
                                }

                                return list;
                              })()}
                              <button className="btn btn-primary">儲存</button>
                          </div>
                      </form>
                  </div>
          )}

          <div className="container">
            <ul className="nav nav-tabs nav-fill">
                  <li className="nav-item">
                      <a href="" className="nav-link active" id='myFavorite' onClick={handleTab}>我的最愛</a>
                  </li>
                  <li className="nav-item">
                      <a href="" className="nav-link" id='myComment' onClick={handleTab}>我的評論</a>
                  </li>
                  <li className="nav-item">
                      <a href="" className="nav-link" id='myCafe' onClick={handleTab}>新增的咖啡廳</a>
                  </li>
              </ul>
              
              <Outlet/>
          </div>
      </div>
  )
}
