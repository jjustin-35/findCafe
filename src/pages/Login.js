import React from 'react'
import { Navigate } from 'react-router';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import { useState } from 'react';

export const Login = () => {
    const authapi = `${process.env.REACT_APP_API_URL2}/auth/login`;
    const { token } = useGlobal().auth;
    const { err, setErr } = useGlobal().errState;
    if (token) {
        return Navigate({ to: '/', replace: false });
    }

    const handleLogin = async(e) => {
        const form = e.target.parentElement;
        const formdata = new FormData(form);

        const email = formdata.get('email');
        const password = formdata.get('password');

        if (email.length < 5 || !/[@]/.test(email)) {
            setErr('Email格式錯誤');
            return setIsErr('email');
        }
        if (password.length < 8 || !/[a-zA-Z0-9!@#$%^&*_]+/.test('pwd')) {
            setErr('密碼格式錯誤');
            return setIsErr('pwd');
        }

        await fetch(authapi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
    }

  return (
      <div className='container'>
          <h2>登入</h2>
          <form action="">
              <label htmlFor="email">email</label>
              <input type="text" id="email" className="form-control" name="email" required />
              {isErr === 'email' && <Message err={err} />}
              <label htmlFor="pwd">密碼</label>
              <input type="text" id="pwd" className="form-control" name="password" required />
              {isErr === 'pwd' && <Message err={err} />}
              <button className="btn btn-primary text-white" onSubmit={handleLogin}>登入</button>
          </form>
          <div>
              <button className="btn btn-blue text-white">Facebook 登入</button>
              <button className="btn btn-orange text-white">Google 登入</button>
          </div>
      </div>
  )
}
