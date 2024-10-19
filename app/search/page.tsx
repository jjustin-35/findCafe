'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RootState, AppDispatch } from '@/config/configureStore';
import { getAreas } from '@/redux/search';
import Select from '@/components/Select';

export default function Search() {
  const { areas } = useSelector((state: RootState) => state.search);
  const [keyword, setKeyword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const areaNames = areas?.map((area: { name: string }) => area.name) || [];
  const countries = ['請選擇', ...areaNames];
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!areas?.length) {
      dispatch(getAreas());
    }
  }, [areas]);

  const onSubmit: SubmitHandler<{ keyword: string; area: string }> = async (data) => {
    console.log(data);
  };

  return (
    <div className="py-5 container position-relative">
      <div className="row justify-content-end">
        <div className="col offset-md-1">
          <h1 className="banner__title fw-bold text-white text-center text-md-start">找到專屬於你的咖啡廳</h1>
          <form
            className="mb-1 d-flex justify-content-center justify-content-md-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="搜尋關鍵字"
              className="me-md-1 me-0-5 p-0-5 fs-1 rounded-2 banner__search"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              {...register('keyword')}
            />
            <Select opt={countries} name="countries" className="d-inline fs-1 py-0-5" register={register} />
          </form>
        </div>
      </div>
    </div>
  );
}
