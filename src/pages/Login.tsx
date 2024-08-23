import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useGlobal } from '../redux/GlobalProvider';
import { Message } from '../components/Message';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface FormInputs {
  email: string;
  password: string;
}

interface UserProfile {
  address?: {
    district?: string;
    districts?: string;
  };
  [key: string]: any;
}

export const Login: React.FC = () => {
  document.title = '找找咖啡 | 登入';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();
  const { state } = useLocation();

  const api = process.env.REACT_APP_API_URL;
  const authapi = `${api}/auth/login`;

  const { token, setToken } = useGlobal().auth as { token: string; setToken: (token: string) => void };
  const [err, setErr] = useState<string>('');
  const { setProfile } = useGlobal().userInfo as { setProfile: (profile: UserProfile) => void };

  const [loading, setLoading] = useState<boolean>(false);
  if (token) {
    navigate(-1);
    return null;
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
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
        navigate(state as string);
      }
    } catch (err) {
      setErr('出現問題，請稍後再試');
    }

    setLoading(false);
  };

  return (
    <section className="bg-image bg-image-login">
      <div className="container py-5">
        <div className="row justify-content-end">
          <div className="col-lg-4 col-12">
            <div className="border rounded-5 p-1-5 bg-auth shadow">
              <h2 className="fs-2 fw-bold text-center mb-3">登入</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                <div className="mb-1">
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
                    className="form-control"
                    {...register('password', {
                      required: { value: true, message: '密碼錯誤' },
                      pattern: { value: /.*[A-Z]+.*[0-9]+.*|.*[0-9]+.*[A-Z]+.*/g, message: '密碼錯誤' },
                      minLength: { value: 8, message: '密碼錯誤' },
                    })}
                  />
                  <Message err={errors.password?.message} />
                </div>
                {err && <Message err={err} />}
                <div className="mx-auto mt-2-5">
                  <button className="btn btn-primary d-block text-white px-1-5 mb-1 w-100" disabled={loading}>
                    <span className={loading ? 'spinner-border spinner-border-sm me-0-5' : ''}></span>登入
                  </button>
                  <div className="text-center">
                    <Link to="/forgotpwd" className="text-normal">
                      忘記密碼?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
