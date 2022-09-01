import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import {useForm} from 'react-hook-form';

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const api = process.env.REACT_APP_API_URL2;
    const authapi = `${api}/auth/login`;
    const GoogleAuth = `${api}/auth/google`;
    const FbAuth = `${api}/auth/facebook`;

    const { token, setToken } = useGlobal().auth;
    const { err, setErr } = useGlobal().errState;
    const { profile, setProfile } = useGlobal().userInfo;
    if (token) {
        return navigate(-1);
    }

    const onSubmit = async (data) => {

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
                navigate(-2)
            }
        } catch (err) {
            setErr('出現問題，請稍後再試');
        }
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
      <div className='container py-5'>
          <h2 className='fs-3 fw-bold text-center mb-3'>登入</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)} className='mb-2 w-md-50 mx-auto'>
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
              <button className="btn btn-primary d-block text-white px-1-5 mb-0-5">登入</button>
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
              <div className="col-5 mb-2 seperator bg-white">
                  <p className="seperator-font fs-1-25">or</p>
              </div>
              <button className="btn btn-blue text-white mb-1 col-3" onClick={()=>onAuth(FbAuth)}>Facebook 登入</button>
              <button className="btn btn-orange text-white col-3" onClick={()=>onAuth(GoogleAuth)}>Google 登入</button>
          </div>
      </div>
  )
}
