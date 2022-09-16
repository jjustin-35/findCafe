import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const Signup = () => {
    const { register, handleSubmit, formState: { errors } , watch} = useForm();
    const navigate = useNavigate();

    const api = process.env.REACT_APP_API_URL
    const authapi = `${api}/auth/sign_up`;
    const GoogleAuth = `${api}/auth/google`;
    const FbAuth = `${api}/auth/facebook`;

    const { token, setToken } = useGlobal().auth;
    const { err, setErr } = useGlobal().errState;
    const { profile, setProfile } = useGlobal().userInfo;
    const [loading, setLoading] = useState(false);
    if (token) {
        return navigate(-1);
    }

    const onSubmit = async (data) => {
        const { pwdcheck, ...info } = data;
        setLoading(true);
        try {
            await fetch(authapi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            });

            alert('註冊成功!請重新登入');
            navigate('/');
        } catch (err) {
            setErr('註冊資料錯誤');
        }

        setLoading(false);
    }

  return (
      <div className='bg-image bg-image-signup'>
          <div className='container py-5'>
          <div className="row justify-content-end">
              <div className="col-lg-5 col-12">
                  <div className="p-1-5 border rounded-5 shadow bg-auth">
                  <h2 className='fs-2 fw-bold text-center mb-3'>註冊</h2>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className='mb-2 mx-auto'>
                        <div className='mb-1-5'>
                            <label htmlFor="name" className="mb-0-5">姓名</label>
                            <input type="text" className="form-control mb-1" {...register('name', {
                                required: {value: true, message: '請填寫姓名'},
                                minLength: {value: 2, message: '字數太少'},
                                maxLength: {value: 20, message: '字數太多'}
                            })} />
                            <Message err={errors.name?.message} />

                            <label htmlFor="email" className='mb-0-5'>email</label>
                            <input type="text" id="email" className="form-control mb-1"{...register('email', {
                                required: { value: true, message: '請填寫email' },
                                pattern: { value: /[@]+/, message: '格式錯誤' },
                                minLength: {value: 5, message: '格式錯誤'}
                            })} />
                            <Message err={errors.email?.message} />
                            <label htmlFor="pwd" className='mb-0-5'>密碼</label>
                            <input type="password" id="pwd" className="form-control mb-1" {...register('password', {
                                required: { value: true, message: '必填' },
                                pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                                minLength: {value:8, message: '密碼錯誤'}
                            })}/>
                            <Message err={errors.password?.message} />
                            
                            <label htmlFor="pwd1check" className='mb-0-5'>請再輸入一次密碼</label>
                            <input type="password" id='pwdcheck' className="form-control mb-1" {...register('pwdcheck', {
                                required: { value: true, message: '必填' },
                                validate: v => v === watch('password') || '與上面密碼不符'
                            })} />
                            <Message err={errors.pwdcheck?.message} />
                        </div>
                        
                        <Message err={err} />
                        <div className=' w-fit mx-auto'>
                        <button className="btn btn-primary d-block text-white px-1-5 mb-0-5" disabled={loading}><span className={loading ? "spinner-border text-primary spinner-border-sm" : ""}></span>註冊</button>
                        <div>
                                已有帳號? 
                                <Link to="/login">登入</Link>
                            </div>
                        </div>
                    </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
