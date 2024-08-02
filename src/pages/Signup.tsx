import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobal } from '../context/GlobalProvider';
import { Message } from '../components/Message';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  pwdcheck: string;
}

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const navigate = useNavigate();

  const api = process.env.REACT_APP_API_URL;
  const authapi = `${api}/auth/sign_up`;

  const { token } = useGlobal().auth;
  const { err, setErr } = useGlobal().errState;
  const [loading, setLoading] = useState<boolean>(false);
  
  if (token) {
    navigate(-1);
    return null;
  }

  const onSubmit = async (data: FormData) => {
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
    <div className="bg-image bg-image-signup">
      <div className="container py-5">
        <div className="row justify-content-end">
          <div className="col-lg-4 col-12">
            <div className="p-1-5 border rounded-5 shadow bg-auth">
              <h2 className="fs-2 fw-bold text-center mb-3">註冊</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                <div className="mb-2-5">
                  <label htmlFor="name" className="mb-0-5">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control mb-1"
                    {...register('name', {
                      required: { value: true, message: '請填寫姓名' },
                      minLength: { value: 2, message: '字數太少' },
                      maxLength: { value: 20, message: '字數太多' },
                    })}
                  />
                  <Message err={errors.name?.message} />

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
                  <label htmlFor="pwd" className="mb-0-5">
                    密碼
                  </label>
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
                      validate: (v: string) => v === watch('password') || '與上面密碼不符',
                    })}
                  />
                  <Message err={errors.pwdcheck?.message} />
                </div>

                <Message err={err} />
                <div className="mx-auto">
                  <button className="btn btn-primary d-block text-white w-100 mb-1" disabled={loading}>
                    <span className={loading ? 'spinner-border text-primary spinner-border-sm' : ''}></span>註冊
                  </button>
                  <div className="text-normal text-center">
                    已有帳號?
                    <Link to="/login" className="text-normal">
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
