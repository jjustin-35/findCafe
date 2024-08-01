import React from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { useNavigate, Link } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(6142): Module '../components/Message' was resolved to 'C:... Remove this comment to see the full error message
import { Message } from '../components/Message';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const api = process.env.REACT_APP_API_URL;
  const authapi = `${api}/auth/sign_up`;

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token } = useGlobal().auth;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { err, setErr } = useGlobal().errState;
  const [loading, setLoading] = useState(false);
  if (token) {
    return navigate(-1);
  }

  const onSubmit = async (data: any) => {
    const info = data;
    setLoading(true);
    try {
      await fetch(authapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      alert('註冊成功!請重新登入');
      navigate('/');
    } catch (err) {
      setErr('註冊資料錯誤');
    }

    setLoading(false);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="bg-image bg-image-signup">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="container py-5">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="row justify-content-end">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="col-lg-4 col-12">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="p-1-5 border rounded-5 shadow bg-auth">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h2 className="fs-2 fw-bold text-center mb-3">註冊</h2>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <form action="" onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="mb-2-5">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <label htmlFor="name" className="mb-0-5">
                    姓名
                  </label>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <input
                    type="text"
                    className="form-control mb-1"
                    {...register('name', {
                      required: { value: true, message: '請填寫姓名' },
                      minLength: { value: 2, message: '字數太少' },
                      maxLength: { value: 20, message: '字數太多' },
                    })}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Message err={errors.name?.message} />

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <label htmlFor="email" className="mb-0-5">
                    email
                  </label>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <input
                    type="text"
                    id="email"
                    className="form-control mb-1"
                    {...register('email', {
                      required: { value: true, message: '請填寫email' },
                      pattern: { value: /[@]+/, message: '格式錯誤' },
                      minLength: { value: 5, message: '格式錯誤' },
                    })}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Message err={errors.email?.message} />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <label htmlFor="pwd" className="mb-0-5">
                    密碼
                  </label>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <input
                    type="password"
                    id="pwd"
                    className="form-control mb-1"
                    placeholder="請輸入8~16個大小寫字母及數字"
                    {...register('password', {
                      required: { value: true, message: '必填' },
                      pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                      minLength: { value: 8, message: '密碼錯誤' },
                    })}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Message err={errors.password?.message} />

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <label htmlFor="pwd1check" className="mb-0-5">
                    請再輸入一次密碼
                  </label>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <input
                    type="password"
                    id="pwdcheck"
                    className="form-control mb-1"
                    {...register('pwdcheck', {
                      required: { value: true, message: '必填' },
                      validate: (v: any) => v === watch('password') || '與上面密碼不符',
                    })}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Message err={errors.pwdcheck?.message} />
                </div>

                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Message err={err} />
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className=" mx-auto">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className="btn btn-primary d-block text-white w-100 mb-1" disabled={loading}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={loading ? 'spinner-border text-primary spinner-border-sm' : ''}></span>註冊
                  </button>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="text-normal text-center">
                    已有帳號?
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link to="/login" className=" text-normal">
                      登入
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
