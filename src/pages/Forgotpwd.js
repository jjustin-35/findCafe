import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import { useForm } from 'react-hook-form';

export const Forgotpwd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const api = process.env.REACT_APP_API_URL2;
  const authapi = `${api}/auth/change_pwd`;

  const { token } = useGlobal().auth;
  const { err, setErr } = useGlobal().errState;
  const [isVerified, setIsVerified] = useState(null);

  if (token) {
    return navigate(-1);
  }

  const onSubmit = async (data) => {
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
        const { verify } = response.body;
        setIsVerified(verify);
      }
    } catch (err) {
      setErr('出現問題，請稍後再試');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fs-3 fw-bold text-center mb-3">忘記密碼</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="mb-2 w-md-50 mx-auto">
        <div className="mb-1-5">
          {!isVerified ? (
            <div>
              <label htmlFor="email" className="mb-0-5">
                email
              </label>
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
              <Message err={errors.email?.message} />
            </div>
          ) : (
            <div>
              <label htmlFor="pwd" className="mb-0-5">
                輸入新密碼
              </label>
              <input
                type="password"
                className="form-control mb-1"
                {...register('password', {
                  required: { value: true, message: '密碼錯誤' },
                  pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                  minLength: { value: 8, message: '密碼錯誤' },
                })}
              />
              <Message err={errors.password?.message} />

              <label htmlFor="pwd1check" className="mb-0-5">
                請再輸入一次密碼
              </label>
              <input
                type="password"
                id="pwdcheck"
                className="form-control mb-1"
                {...register('pwdcheck', {
                  required: { value: true, message: '必填' },
                  validate: (v) => v === watch('password') || '與上面密碼不符',
                })}
              />
              <Message err={errors.pwdcheck?.message} />
            </div>
          )}
          {err && <Message err={err} />}
          <div className=" w-fit mx-auto">
            <button className="btn btn-primary d-block text-white px-1-5 mb-0-5">提交</button>
          </div>
        </div>
      </form>
    </div>
  );
};
