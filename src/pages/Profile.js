import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { useGlobal } from '../context/GlobalProvider';
import { useForm, FormProvider } from 'react-hook-form';

import { Address } from '../components/Address';
import { Message } from '../components/Message';
import { MyFav } from '../components/MyFav';
import { MyComment } from '../components/MyComment';

export const Profile = () => {
    document.title = "找找咖啡 | 我的頁面"
    const localUrl = process.env.PUBLIC_URL;
    const [current, setCurrent] = useState('myFavorite');
    const [isEdit, setIsEdit] = useState(false);
    const { profile, setProfile, setNewInfo } = useGlobal().userInfo;
    let { address = null, thumbnail = null, email, name } = profile;
    const [img, setImg] = useState(thumbnail);
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

    function handleImg(e) {
        if(e.target.files && e.target.files[0]){
            const reader = new FileReader();
            reader.onload = function (e) {
             setImg(e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
      }

    const onSubmit = (data) => {
        // change the name
        delete Object.assign(data, {["address.country"]: data["country"] })["country"];
        delete Object.assign(data, {["address.districts"]: data["districts"] })["districts"];

        // delete unchange info
        for (let prop in data) {
            if (!data[prop]) {
                delete data[prop];
            }
        }
        data.thumbnail = img;

        if (!data.thumbnail) {
            delete data.thumbnail;
        }

        setNewInfo(data);

        // set new profile        
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
        e.preventDefault();
        setCurrent(e.target.id);
    }
  return (
      <div className='py-3 profile-board'>
          {!isEdit ? <div className="container d-flex align-items-center mb-3">
            <div className="rounded-circle profile-thumbnail text-center me-1">
                <img src={img ? img : `${localUrl}/img/blank-profile-picture.png`} alt="" className='h-100'/>
            </div>
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
                              <div className="rounded-circle profile-thumbnail text-center">
                                  <img src={img ? img : `${localUrl}/img/blank-profile-picture.png`} alt="" className='h-100'/>
                              </div>
                              <div className="bg-black opacity-50 rounded-circle position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center">
                                  <p className="mb-0 text-white">編輯圖片</p>
                              </div>
                              <input type="file" className='d-none' accept="image/*" onChange={ handleImg } />
                          </label>
                          <div className='mt-1-5'>
                            <input type="text" className="form-control" defaultValue={name} {...register('name', {
                                required: {value: true, message: '請輸入姓名'}
                            })} />
                            <FormProvider {...methods}>
                                <Address labelClass='d-none'/>
                            </FormProvider>
                            <input type="email" className="form-control" defaultValue={email} {...register('email', {
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
            <ul className="nav nav-tabs nav-fill mb-1-5">
                  <li className="nav-item">
                      <a href="" className="nav-link active fs-1-25 fw-bold" id='myFavorite' onClick={handleTab}>我的最愛</a>
                  </li>
                  <li className="nav-item">
                      <a href="" className="nav-link fs-1-25 fw-bold" id='myComment' onClick={handleTab}>我的評論</a>
                  </li>
                  {/* <li className="nav-item">
                      <a href="" className="nav-link fs-1-25 fw-bold" id='myCafe' onClick={handleTab}>新增的咖啡廳</a>
                  </li> */}
              </ul>
              
              <div>
                  {current === "myFavorite" ? <MyFav/> : current === "myComment" ? <MyComment/> : ""}
              </div>
          </div>
      </div>
  )
}
