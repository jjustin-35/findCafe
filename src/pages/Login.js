import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import {useForm} from 'react-hook-form';
import { useState } from 'react';

export const Login = () => {
    document.title = "找找咖啡 | 登入"
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const api = process.env.REACT_APP_API_URL;
    const authapi = `${api}/auth/login`;
    const GoogleAuth = `${api}/auth/google`;
    const FbAuth = `${api}/auth/facebook`;

    const { token, setToken } = useGlobal().auth;
    const [ err, setErr ] = useState("");
    const { profile, setProfile } = useGlobal().userInfo;

    const [loading, setLoading] = useState(false);
    if (token) {
        return navigate(-1);
    }

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(authapi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                setErr('帳號/密碼錯誤')
            } else {
                const res = await response.json();
                const { token, user } = res;

                setToken(token);
                setProfile(user);

                localStorage.setItem('token', token);
                localStorage.setItem('profile', JSON.stringify(user));
                alert('登入成功!')
                navigate(-1);
            }
        } catch (err) {
            setErr('出現問題，請稍後再試');
        }

        setLoading(false);
    }

    async function onAuth(authPath){
        try {
            window.open(authPath, '_self');
        } catch(err) {
            console.log(err);
            setErr('登入出現問題，請重新試一次');
        }
    }

    return (
        <section className="bg-image bg-image-login">
            <div className='container py-5'>
          <div className="row justify-content-end">
              <div className="col-lg-5 col-12">
                  <div className="border rounded-5 p-1-5 bg-auth shadow">
                  <h2 className='fs-2 fw-bold text-center mb-3'>登入</h2>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className='mb-2 mx-auto'>
                    <div className='mb-1-5'>
                    <label htmlFor="email" className='mb-0-5'>email</label>
                        <input type="text" id="email" className="form-control mb-1"{...register('email', {
                            required: { value: true, message: '請填寫email' },
                            pattern: { value: /[@]+/, message: '格式錯誤' },
                            minLength: {value: 5, message: '格式錯誤'}
                        })} />
                        <Message err={errors.email?.message} />
                        <label htmlFor="pwd" className='mb-0-5'>密碼</label>
                        <input type="password" className="form-control mb-1" {...register('password', {
                            required: { value: true, message: '密碼錯誤' },
                            pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                            minLength: {value:8, message: '密碼錯誤'}
                        })} />
                        <Message err={errors.password?.message} />
                    </div>

                    {err && <Message err={err} />}
                    <div className=' w-fit mx-auto'>
                        <button className="btn btn-primary d-block text-white px-1-5 mb-0-5" disabled={loading}>
                            <span className={ loading ? "spinner-border spinner-border-sm me-0-5" : ""}></span>登入
                        </button>
                    <div>
                            尚未註冊? 
                            <Link to="/signup">註冊</Link>
                        </div>
                    <div>
                            <Link to="/forgotpwd">忘記密碼</Link>
                        </div>
                    </div>
                    
                    </form>
                    <div className=' mx-auto row flex-column align-items-center'>
                        <p className="seperator fs-1-25">or</p>
                        <button className="btn btn-blue text-white mb-1 w-50" onClick={()=>onAuth(FbAuth)}>Facebook 登入</button>
                        <button className="btn btn-orange text-white w-50" onClick={()=>onAuth(GoogleAuth)}>Google 登入</button>
                    </div>  
                  </div>
              </div>
          </div>
      </div>
      </section>
  )
}
