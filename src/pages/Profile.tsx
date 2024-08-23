import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../redux/search';
import { useForm, FormProvider } from 'react-hook-form';

import { Address } from '../components/Address';
import { Message } from '../components/Message';
import { MyFav } from '../components/MyFav';
import { MyComment } from '../components/MyComment';

interface ProfileData {
  name: string;
  email: string;
  thumbnail?: string;
  address?: {
    country: string;
    districts: string;
  };
}

export const Profile: React.FC = () => {
  document.title = '找找咖啡 | 我的頁面';
  const localUrl = process.env.PUBLIC_URL || '';
  const [current, setCurrent] = useState<string>('myFavorite');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { profile, setProfile, setNewInfo } = useGlobal().userInfo;
  const { address = null, thumbnail = null, email, name } = profile as ProfileData;
  const [img, setImg] = useState<string | null>(thumbnail);
  const addressText = address ? `${address.country}${address.districts}` : null;

  const methods = useForm<ProfileData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const tabs = document.querySelectorAll('.nav-link');

    tabs.forEach((tab) => {
      if (tab instanceof HTMLElement && tab.id === current) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }, [current]);

  const onEdit = () => {
    setIsEdit(true);
  };

  function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === 'string') {
          setImg(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onSubmit = (data: ProfileData) => {
    const isDiff = img !== null && img !== profile.thumbnail;
    data.thumbnail = img || undefined;
    
    let info = { ...profile } as ProfileData;
    for (let i in data) {
      if (i in data) {
        if (i === 'country' || i === 'districts') {
          if (info.address) {
            info.address[i as keyof typeof info.address] = data[i as keyof typeof data] as string;
          }
        } else {
          (info as any)[i] = (data as any)[i];
        }
      }
    }

    setProfile(info);

    const newData = {
      ...data,
      'address.country': data.address?.country,
      'address.district': data.address?.districts,
    };
    delete newData.country;
    delete newData.districts;

    for (let prop in newData) {
      if (newData[prop as keyof typeof newData] === undefined) {
        delete newData[prop as keyof typeof newData];
      }
    }

    if (!newData.thumbnail || !isDiff) {
      delete newData.thumbnail;
    }

    setNewInfo(newData);
    setIsEdit(false);
  };

  const handleTab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.currentTarget.id) {
      setCurrent(e.currentTarget.id);
    }
  };

  return (
    <div className="py-3 profile-board">
      {!isEdit ? (
        <div className="container d-flex align-items-center mb-3">
          <div className="rounded-circle profile-thumbnail text-center me-1">
            <img src={img ? img : `${localUrl}/img/blank-profile-picture.png`} alt="" className="h-100" />
          </div>
          <div>
            <div className="h2 fs-2 fw-bold">{name}</div>
            {addressText && <p>{addressText}</p>}
            <p>{email}</p>
            <div>
              <button className="btn btn-outline-primary me-0-5" onClick={onEdit}>
                編輯個人資料
              </button>
              <button className="btn btn-outline-primary">修改密碼</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container d-flex mb-3">
          <form className="w-20 d-flex" onSubmit={handleSubmit(onSubmit)}>
            <label className="rounded-circle w-fit h-fit position-relative me-2 pointer">
              <div className="rounded-circle profile-thumbnail text-center">
                <img src={img ? img : `${localUrl}/img/blank-profile-picture.png`} alt="" className="h-100" />
              </div>
              <div className="bg-black opacity-50 rounded-circle position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center">
                <p className="mb-0 text-white">編輯圖片</p>
              </div>
              <input type="file" className="d-none" accept="image/*" onChange={handleImg} />
            </label>
            <div className="mt-1-5">
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                {...register('name', {
                  required: { value: true, message: '請輸入姓名' },
                })}
              />
              <FormProvider {...methods}>
                <Address
                  labelClass="d-none"
                  defaultValue={{ country: address?.country, districts: address?.districts }}
                />
              </FormProvider>
              <input
                type="email"
                className="form-control"
                defaultValue={email}
                {...register('email', {
                  required: { value: true, message: '請輸入email' },
                  pattern: { value: /[@]+/, message: '格式錯誤' },
                })}
              />

              {Object.entries(errors).map(([field, error]) => (
                <Message key={field} err={error.message} />
              ))}
              <button className="btn btn-primary">儲存</button>
            </div>
          </form>
        </div>
      )}

      <div className="container">
        <ul className="nav nav-tabs nav-fill mb-1-5">
          <li className="nav-item">
            <a href="" className="nav-link active fs-1-25 fw-bold" id="myFavorite" onClick={handleTab}>
              我的最愛
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link fs-1-25 fw-bold" id="myComment" onClick={handleTab}>
              我的評論
            </a>
          </li>
        </ul>

        <div>{current === 'myFavorite' ? <MyFav /> : current === 'myComment' ? <MyComment /> : null}</div>
      </div>
    </div>
  );
};
