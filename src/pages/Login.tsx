import React from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { useNavigate, useLocation, Link } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(6142): Module '../components/Message' was resolved to 'C:... Remove this comment to see the full error message
import { Message } from '../components/Message';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const Login = () => {
  document.title = '找找咖啡 | 登入';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const api = process.env.REACT_APP_API_URL;
  const authapi = `${api}/auth/login`;

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token, setToken } = useGlobal().auth;
  const [err, setErr] = useState('');
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { setProfile } = useGlobal().userInfo;

  const [loading, setLoading] = useState(false);
  if (token) {
    return navigate(-1);
  }

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(authapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setErr('帳號/密碼錯誤');
      } else {
        const res = await response.json();
        const { token, user } = res;
        if (user.address) {
          delete Object.assign(user.address, { ['districts']: user.address['district'] })['district'];
        }

        setToken(token);
        setProfile(user);

        localStorage.setItem('token', token);
        localStorage.setItem('profile', JSON.stringify(user));
        alert('登入成功!');
        navigate(state);
      }
    } catch (err) {
      setErr('出現問題，請稍後再試');
    }

    setLoading(false);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section className="bg-image bg-image-login">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="container py-5">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="row justify-content-end">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className="col-lg-4 col-12">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="border rounded-5 p-1-5 bg-auth shadow">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h2 className="fs-2 fw-bold text-center mb-3">登入</h2>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <form action="" onSubmit={handleSubmit(onSubmit)} className=" mx-auto">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="mb-1">
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
                    className="form-control"
                    {...register('password', {
                      required: { value: true, message: '密碼錯誤' },
                      pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                      minLength: { value: 8, message: '密碼錯誤' },
                    })}
                  />
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Message err={errors.password?.message} />
                </div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                {err && <Message err={err} />}
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className=" mx-auto mt-2-5">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <button className="btn btn-primary d-block text-white px-1-5 mb-1 w-100" disabled={loading}>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span className={loading ? 'spinner-border spinner-border-sm me-0-5' : ''}></span>登入
                  </button>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="text-center">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link to="/forgotpwd" className="text-normal">
                      忘記密碼?
                    </Link>
                  </div>
                </div>
              </form>
              {/* <div className=' mx-auto row flex-column align-items-center'>
                        <p className="seperator fs-1-25">or</p>
                        <button className="btn btn-blue text-white mb-1 w-50" onClick={()=>onAuth(FbAuth)}>Facebook 登入</button>
                        <button className="btn btn-orange text-white w-50" onClick={()=>onAuth(GoogleAuth)}>Google 登入</button>
                    </div>   */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
