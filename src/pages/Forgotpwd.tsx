import React, { useState } from 'react';
// @ts-expect-error TS(2792): Cannot find module 'react-router-dom'. Did you mea... Remove this comment to see the full error message
import { useNavigate } from 'react-router-dom';
// @ts-expect-error TS(6142): Module '../context/GlobalProvider' was resolved to... Remove this comment to see the full error message
import { useGlobal } from '../context/GlobalProvider';
// @ts-expect-error TS(6142): Module '../components/Message' was resolved to 'C:... Remove this comment to see the full error message
import { Message } from '../components/Message';
// @ts-expect-error TS(2792): Cannot find module 'react-hook-form'. Did you mean... Remove this comment to see the full error message
import { useForm } from 'react-hook-form';

export const Forgotpwd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const api = process.env.REACT_APP_API_URL2;
  const authapi = `${api}/auth/change_pwd`;

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { token } = useGlobal().auth;
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { err, setErr } = useGlobal().errState;
  const [isVerified, setIsVerified] = useState(null);

  if (token) {
    return navigate(-1);
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(authapi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setErr('信箱錯誤');
      } else {
        // @ts-expect-error TS(2339): Property 'verify' does not exist on type 'Readable... Remove this comment to see the full error message
        const { verify } = response.body;
        setIsVerified(verify);
      }
    } catch (err) {
      setErr('出現問題，請稍後再試');
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="container py-5">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h2 className="fs-3 fw-bold text-center mb-3">忘記密碼</h2>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <form action="" onSubmit={handleSubmit(onSubmit)} className="mb-2 w-md-50 mx-auto">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mb-1-5">
          {!isVerified ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
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
            </div>
          ) : (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <label htmlFor="pwd" className="mb-0-5">
                輸入新密碼
              </label>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <input
                type="password"
                className="form-control mb-1"
                {...register('password', {
                  required: { value: true, message: '密碼錯誤' },
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
          )}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          {err && <Message err={err} />}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className=" w-fit mx-auto">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className="btn btn-primary d-block text-white px-1-5 mb-0-5">提交</button>
          </div>
        </div>
      </form>
    </div>
  );
};
