'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/config/configureStore';
import { Address } from '@/components/Address';
import { Select } from '@/components/Select';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface FormData {
  name: string;
  branch: string;
  tel: string;
  address: {
    country: string;
    districts: string;
    location: string;
  };
  time: string[];
  limited_time: string;
  socket: string;
  url: string;
  wifi: string;
  quiet: string;
  tasty: string;
  cheap: string;
  music: string;
  seat: string;
  photo: FileList;
}

export default function AddCafe() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  const [timeList, setTimeList] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'photo') {
        for (let i = 0; i < data.photo.length; i++) {
          formData.append('photo', data.photo[i]);
        }
      } else if (key === 'address') {
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'time') {
        formData.append(key, JSON.stringify(timeList));
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch(`${apiUrl}/cafe`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (response.ok) {
        alert('新增成功！');
        router.push('/');
      } else {
        throw new Error('新增失敗');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('新增失敗，請稍後再試。');
    }
  };

  const timeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.name as keyof FormData, e.target.value);
  };

  const addTime = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const weekday = document.getElementById('weekday') as HTMLSelectElement;
    const timezone1 = document.getElementById('timezone1') as HTMLSelectElement;
    const open = document.getElementById('open') as HTMLSelectElement;
    const timezone2 = document.getElementById('timezone2') as HTMLSelectElement;
    const close = document.getElementById('close') as HTMLSelectElement;

    const newTime = `${weekday.value} ${timezone1.value}${open.value} ~ ${timezone2.value}${close.value}`;
    setTimeList([...timeList, newTime]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            newPreviews.push(e.target.result);
            setPreview([...preview, ...newPreviews]);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => (
    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
      {String(i + 1).padStart(2, '0')}
    </option>
  ));

  return (
    <div className="container py-3">
      <h2 className="fs-3 text-primary fw-bold text-center mb-3">新增咖啡廳</h2>
      <form onSubmit={handleSubmit(onSubmit)} id="addCafe">
        <div className="addCafe__name">
          <label htmlFor="name">
            咖啡店名:
            <input 
              type="text" 
              className="addCafe__item" 
              {...register('name', { required: '請輸入咖啡店名' })} 
            />
          </label>
          {errors.name && <span>{errors.name.message}</span>}
          <label htmlFor="branch">
            分店:
            <input 
              type="text" 
              className="addCafe__item" 
              {...register('branch')} 
            />
          </label>
        </div>

        <label htmlFor="tel">
          電話:
          <input 
            type="text" 
            className="addCafe__item" 
            {...register('tel')} 
          />
        </label>

        <label htmlFor="address">
          地址:
          <Address register={register} />
        </label>

        <label htmlFor="time">
          營業時間:
          <span className="addCafe__item">
            <Select
              opt={['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']}
              name="weekday"
              id="weekday"
              onChange={timeInput}
            />

            <Select opt={['AM', 'PM']} name="timezone1" id="timezone1" onChange={timeInput} />

            <select name="open" id="open" onChange={timeInput}>
              {hours}
            </select>

            <span> ～ </span>

            <Select opt={['AM', 'PM']} name="timezone2" id="timezone2" onChange={timeInput} />

            <select name="close" id="close" onChange={timeInput}>
              {hours}
            </select>

            <button onClick={addTime}>新增</button>
          </span>
        </label>

        {timeList.map((time, index) => (
          <p key={index}>{time}</p>
        ))}

        <label htmlFor="limited_time">
          有無限時:
          <Select
            opt={['有', '無']}
            name="limited_time"
            {...register('limited_time', { required: '請選擇是否有限時' })}
          />
        </label>
        {errors.limited_time && <span>{errors.limited_time.message}</span>}

        <label htmlFor="socket">
          有無插座:
          <Select
            opt={['有', '無']}
            name="socket"
            {...register('socket', { required: '請選擇是否有插座' })}
          />
        </label>
        {errors.socket && <span>{errors.socket.message}</span>}

        <label htmlFor="url">
          網站連結:
          <input 
            type="text" 
            className="addCafe__item" 
            {...register('url')} 
          />
        </label>

        <label htmlFor="wifi">
          wifi穩定:
          <input 
            type="range" 
            min="0" 
            max="5" 
            {...register('wifi')} 
          />
        </label>

        <label htmlFor="quiet">
          安靜程度:
          <input 
            type="range" 
            min="0" 
            max="5" 
            {...register('quiet')} 
          />
        </label>

        <label htmlFor="tasty">
          咖啡好喝:
          <input 
            type="range" 
            min="0" 
            max="5" 
            {...register('tasty')} 
          />
        </label>

        <label htmlFor="cheap">
          價格便宜:
          <input 
            type="range" 
            min="0" 
            max="5" 
            {...register('cheap')} 
          />
        </label>

        <label htmlFor="music">
          音樂好聽:
          <input 
            type="range" 
            min="0" 
            max="5" 
            {...register('music')} 
          />
        </label>

        <label htmlFor="seat">
          座位多寡:
          <input 
            type="range" 
            min="0" 
            max="5" 
            {...register('seat')} 
          />
        </label>

        <label htmlFor="photo">
          上傳圖片:
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            {...register('photo')} 
            onChange={handleImageChange}
          />
        </label>

        {preview.map((src, index) => (
          <Image key={index} src={src} alt={`Preview ${index + 1}`} width={100} height={100} />
        ))}

        <button type="submit" className="btn btn-primary">
          新增咖啡廳
        </button>
      </form>
    </div>
  );
}