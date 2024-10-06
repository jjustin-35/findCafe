'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/config/configureStore';
import { setErr } from '@/redux/search';
import Message from '@/components/Message';
import Address from '@/components/Address';
import Select from '@/components/Select';

interface TimeHook {
  weekday: string;
  timezone1: string;
  open: string;
  timezone2: string;
  close: string;
}

interface CafeObj {
  time: TimeHook[];
  address: {
    country: string;
    districts: string;
    location: string;
  };
  menu: string[];
  pics: string[];
  name: string;
  branch: string;
  tel: string;
  price: string;
}

export default function AddCafe() {
  // api url
  const api = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${api}/cafe/add`;

  // err
  const error = useSelector((state: RootState) => state.search.error);
  const dispatch = useDispatch<AppDispatch>();

  // hook
  const [timeHook, setTimeHook] = useState<TimeHook>({
    weekday: '星期一',
    timezone1: 'am',
    open: '01:00',
    timezone2: 'am',
    close: '01:00',
  });
  // set time array
  const [timeArray, setTimeArray] = useState<TimeHook[]>([]);
  const [timeDisplay, setTimeDisplay] = useState<string[]>([]);
  const [menu, setMenu] = useState<string[]>([]);
  const [pics, setPics] = useState<string[]>([]);

  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    const value = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    return (
      <option value={value} key={value}>
        {value}
      </option>
    );
  });

  // time
  // onchange
  function timeInput(e: ChangeEvent<HTMLSelectElement>) {
    const { id, value } = e.target;
    setTimeHook((prev) => ({ ...prev, [id]: value }));
  }
  // add btn
  function addTime(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // get time hook
    const timeAdded = { ...timeHook };
    const { weekday, timezone1, timezone2, open, close } = timeAdded;

    if (timeArray.some((element) => element.weekday === weekday)) {
      dispatch(setErr('Weekday should not repeat.'));
      return;
    }

    dispatch(setErr(null));
    setTimeArray((prev) => [...prev, timeAdded]);
    setTimeDisplay((prev) => [...prev, `${weekday} ${timezone1}${open} ~ ${timezone2}${close}`]);
  }

  // file
  function getBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result as string);
      });
      reader.readAsDataURL(file);
    });
  }

  async function getFile(e: ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    if (!files) return;

    const newFiles = await Promise.all(Array.from(files).map(getBase64));

    if (name === 'menu') {
      setMenu((prev) => [...prev, ...newFiles]);
    } else if (name === 'pics') {
      setPics((prev) => [...prev, ...newFiles]);
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const cafeObj: Partial<CafeObj> = {};

    // deal with time obj
    cafeObj.time = timeArray.map(({ timezone1, timezone2, ...rest }) => ({
      ...rest,
      open: timezone1 + rest.open,
      close: timezone2 + rest.close,
    }));

    // deal with the address
    const address: { [key: string]: string } = {};
    for (const item of ['country', 'districts', 'location']) {
      const value = formData.get(item);
      if (value === 'null') {
        dispatch(setErr('Please choose a country/district.'));
        return;
      }
      address[item] = value as string;
    }
    cafeObj.address = address as CafeObj['address'];

    // deal with the file
    cafeObj.menu = menu;
    cafeObj.pics = pics;

    // deal with others
    const items = ['name', 'branch', 'tel', 'price'];
    items.forEach((item) => {
      cafeObj[item as keyof CafeObj] = formData.get(item) as string;
    });

    // send data
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlZWM2NGVkLTAwM2ItNDU5ZS04MDYyLTJlNDY4ZDlhZTI1YSIsImVtYWlsIjoidGVzdDZAZW1haWwuY29tIiwiaWF0IjoxNjYxNjgzNzU1LCJleHAiOjE2NjE3NzAxNTV9.ANzRUYTEx7LlXnld0albu0VNX_8yTFc-TfM1ejXJdtY',
        },
        body: JSON.stringify(cafeObj),
      });
      if (response.ok) {
        console.log('Data has been uploaded.');
        // You might want to redirect or show a success message here
      } else {
        throw new Error('Failed to upload data');
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch(setErr('Failed to upload data. Please try again.'));
    }
  }

  return (
    <div className="container py-3">
      <h2 className="fs-3 text-primary fw-bold text-center mb-3">新增咖啡廳</h2>
      <form action={apiUrl} method="POST" id="addCafe" onSubmit={submit}>
        <div className="addCafe__name">
          <label htmlFor="name">
            咖啡店名:
            <input type="text" className="addCafe__item" name="name" id="name" />
          </label>
          <label htmlFor="branch">
            分店:
            <input type="text" className="addCafe__item" name="branch" id="branch" />
          </label>
        </div>

        <label htmlFor="tel">
          電話:
          <input type="text" className="addCafe__item" name="tel" id="tel" />
        </label>
        <label htmlFor="address">
          地址:
          <Address className={'addCafe__item'} />
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

            <button onClick={addTime}>add</button>
          </span>
        </label>
        <div className="timeDisplay">
          {timeDisplay.length > 0 && timeDisplay.map((time, idx) => <p key={idx}>{time}</p>)}
        </div>

        <label htmlFor="price">
          平均價格:
          <select name="price" id="price" className="addCafe__item">
            <option value="100">0~100</option>
            <option value="200">100~200</option>
            <option value="300">200~300</option>
            <option value="400">300~400</option>
            <option value="500">400~500</option>
            <option value="500up">500以上</option>
          </select>
        </label>
        <label htmlFor="menu">
          菜單
          <input
            type="file"
            multiple
            accept="image/*"
            className="addCafe__item"
            name="menu"
            id="menu"
            onChange={getFile}
          />
        </label>
        <div className="displayPics displayPics--menu"></div>
        <label htmlFor="pics">
          照片
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg"
            className="addCafe__item"
            name="pics"
            id="pics"
            onChange={getFile}
          />
        </label>
        <div className="displayPics displayPics--pics"></div>

        <Message err={error} />
        <button className="submit" type="submit">
          提交
        </button>
      </form>
    </div>
  );
}
