import React, { useState, useEffect } from 'react';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useForm, FormProvider } from 'react-hook-form';

// @ts-expect-error TS(6142): Module '../components/Address' was resolved to 'C:... Remove this comment to see the full error message
import { Address } from '../components/Address';
// @ts-expect-error TS(6142): Module '../components/Message' was resolved to 'C:... Remove this comment to see the full error message
import { Message } from '../components/Message';
// @ts-expect-error TS(6142): Module '../components/MyFav' was resolved to 'C:/U... Remove this comment to see the full error message
import { MyFav } from '../components/MyFav';
// @ts-expect-error TS(6142): Module '../components/MyComment' was resolved to '... Remove this comment to see the full error message
import { MyComment } from '../components/MyComment';

export const Profile = () => {
  document.title = '找找咖啡 | 我的頁面';
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const localUrl = process.env.PUBLIC_URL;
  const [current, setCurrent] = useState('myFavorite');
  const [isEdit, setIsEdit] = useState(false);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { profile, setProfile, setNewInfo } = useGlobal().userInfo;
  let { address = null, thumbnail = null, email, name } = profile;
  const [img, setImg] = useState(thumbnail);
  let addressText = address ? address.country + address.districts : null;

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const tabs = document.querySelectorAll('.nav-link');

    tabs.forEach((tab) => {
      if (tab.id === current) {
        tab.classList.add('acitve');
      } else {
        tab.classList.remove('active');
      }
    });
  }, [current]);

  const onEdit = () => {
    setIsEdit(true);
  };

  function handleImg(e: any) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        setImg(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onSubmit = (data: any) => {
    const isDiff = !img ? false : img === profile.thumbnail ? false : true;
    data.thumbnail = img;
    // set new profile
    let info = { ...profile };
    for (let i in data) {
      if (i) {
        if (i === 'country' || i === 'districts') {
          info.address[i] = data[i];
          console.log(info.address);
        } else {
          info[i] = data[i];
        }
      }
    }

    setProfile(info);

    // change the name
    delete Object.assign(data, { ['address.country']: data['country'] })['country'];
    delete Object.assign(data, { ['address.district']: data['districts'] })['districts'];

    // delete unchange info
    for (let prop in data) {
      if (!data[prop]) {
        delete data[prop];
      }
    }

    if (!data.thumbnail || !isDiff) {
      delete data.thumbnail;
    }

    setNewInfo(data);
    setIsEdit(false);
  };

  const handleTab = (e: any) => {
    e.preventDefault();
    setCurrent(e.target.id);
  };
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="py-3 profile-board">
      {!isEdit ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="container d-flex align-items-center mb-3">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="rounded-circle profile-thumbnail text-center me-1">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <img src={img ? img : `${localUrl}/img/blank-profile-picture.png`} alt="" className="h-100" />
          </div>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="h2 fs-2 fw-bold">{name}</div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {addressText && <p>{addressText}</p>}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <p>{email}</p>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button className="btn btn-outline-primary me-0-5" onClick={onEdit}>
                編輯個人資料
              </button>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button className="btn btn-outline-primary">修改密碼</button>
            </div>
          </div>
        </div>
      ) : (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="container d-flex mb-3">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <form action="" className="w-20 d-flex" onSubmit={handleSubmit(onSubmit)}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <label className="rounded-circle w-fit h-fit position-relative me-2 pointer">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="rounded-circle profile-thumbnail text-center">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <img src={img ? img : `${localUrl}/img/blank-profile-picture.png`} alt="" className="h-100" />
              </div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className="bg-black opacity-50 rounded-circle position-absolute w-100 h-100 top-0 left-0 d-flex justify-content-center align-items-center">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <p className="mb-0 text-white">編輯圖片</p>
              </div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input type="file" className="d-none" accept="image/*" onChange={handleImg} />
            </label>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="mt-1-5">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input
                type="text"
                className="form-control"
                defaultValue={name}
                {...register('name', {
                  required: { value: true, message: '請輸入姓名' },
                })}
              />
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <FormProvider {...methods}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Address
                  labelClass="d-none"
                  defaultValue={{ country: address?.country, districts: address?.districts }}
                />
              </FormProvider>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input
                type="email"
                className="form-control"
                defaultValue={email}
                {...register('email', {
                  required: { value: true, message: '請輸入email' },
                  pattern: { value: /[@]+/, message: '格式錯誤' },
                })}
              />

              {(() => {
                const list = [];
                for (let field in errors) {
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  list.push(<Message err={field.message} />);
                }

                return list;
              })()}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <button className="btn btn-primary">儲存</button>
            </div>
          </form>
        </div>
      )}

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="container">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ul className="nav nav-tabs nav-fill mb-1-5">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <li className="nav-item">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <a href="" className="nav-link active fs-1-25 fw-bold" id="myFavorite" onClick={handleTab}>
              我的最愛
            </a>
          </li>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <li className="nav-item">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <a href="" className="nav-link fs-1-25 fw-bold" id="myComment" onClick={handleTab}>
              我的評論
            </a>
          </li>
          {/* <li className="nav-item">
                      <a href="" className="nav-link fs-1-25 fw-bold" id='myCafe' onClick={handleTab}>新增的咖啡廳</a>
                  </li> */}
        </ul>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>{current === 'myFavorite' ? <MyFav /> : current === 'myComment' ? <MyComment /> : ''}</div>
      </div>
    </div>
  );
};
