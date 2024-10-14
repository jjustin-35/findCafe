'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { resetPassword } from '@/apis/auth';
import Message from '@/components/Message';

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [err, setErr] = useState<string>('');
  const router = useRouter();

  const onSubmit = async (data: { email: string; password?: string; password_confirm?: string }) => {
    if (data.password !== data.password_confirm) {
      setErr('密碼與確認密碼不相符');
      return;
    }

    try {
      await resetPassword(data);
      router.push('/auth/login');
    } catch (err) {
      setErr('出現問題，請稍後再試');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fs-3 fw-bold text-center mb-3">忘記密碼</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-2 w-md-50 mx-auto">
        <div className="mb-1-5">
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
            <Message err={errors.email?.message as string | undefined} />
          </div>
          <div>
            <label htmlFor="password" className="mb-0-5">
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
            <Message err={errors.password?.message as string | undefined} />

            <label htmlFor="password_confirm" className="mb-0-5">
              請再輸入一次密碼
            </label>
            <input
              type="password"
              id="password_confirm"
              className="form-control mb-1"
              {...register('password_confirm', {
                required: { value: true, message: '必填' },
                validate: (v: string) => v === watch('password') || '與上面密碼不符',
              })}
            />
            <Message err={errors.password_confirm?.message as string | undefined} />
          </div>
          {err && <Message err={err} />}
          <div className="w-fit mx-auto">
            <button className="btn btn-primary d-block text-white px-1-5 mb-0-5">提交</button>
          </div>
        </div>
      </form>
    </div>
  );
}
