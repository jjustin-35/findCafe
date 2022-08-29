import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import {useForm} from 'react-hook-form';

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const api = process.env.REACT_APP_API_URL2
    const authapi = `${api}/auth/login`;
    const GoogleAuth = `${api}/auth/google`;
    const FbAuth = `${api}/auth/facebook`;

    const { token } = useGlobal().auth;
    const { err, setErr } = useGlobal().errState;
    if (token) {
        return navigate(-1);
    }

    const onSubmit = async (data) => {

        try {
            console.log(data);
            // await fetch(authapi, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(data)
            // });
        } catch (err) {
            console.log(err);
        }
    }

    async function onAuth(authPath){
        await fetch(authPath, {
            method: 'GET',
        })
    }

  return (
      <div className='container'>
          <h2>登入</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)} className='mb-2'>
              <label htmlFor="email">email</label>
              <input type="text" id="email" className="form-control"{...register('email', {
                  required: { value: true, message: '請填寫email' },
                  pattern: { value: /[@]+/, message: '格式錯誤' },
                  minLength: {value: 5, message: '格式錯誤'}
              })} />
              <Message err={errors.email?.message} />
              <label htmlFor="pwd">密碼</label>
              <input type="text" id="pwd" className="form-control" {...register('password', {
                  required: { value: true, message: '密碼錯誤' },
                  pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                  minLength: {value:8, message: '密碼錯誤'}
              })} />
              <Message err={errors.password?.message} />
              <button className="btn btn-primary text-white d-block my-0 mx-auto">登入</button>
          </form>
          <div className='w-fit mx-auto'>
              <button className="btn btn-blue text-white d-block mb-1" onClick={''}>Facebook 登入</button>
              <button className="btn btn-orange text-white d-block mx-auto" onClick={''}>Google 登入</button>
          </div>
      </div>
  )
}
