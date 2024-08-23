'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/config/configureStore';
import { getAreas } from '@/redux/search';
import { Select } from '@/src/components/Select';

export default function Home() {
  const { areas } = useSelector((state: RootState) => state.search);
  const [keyword, setKeyword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const areaNames = areas?.map((area: { name: string }) => area.name) || [];
  const countries = ['請選擇', ...areaNames];

  useEffect(() => {
    if (!areas?.length) {
      dispatch(getAreas());
    }
  }, [areas]);

  return (
    <div className="container-fluid bg-img banner d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col offset-md-1">
            <h1 className="banner__title fw-bold text-white text-center text-md-start">找到專屬於你的咖啡廳</h1>
            <div className="mb-1 d-flex justify-content-center justify-content-md-start">
              <input
                type="text"
                placeholder="搜尋關鍵字"
                className="me-md-1 me-0-5 p-0-5 fs-1 rounded-2 banner__search"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
              <FormProvider {...useForm()}>
                <Select opt={countries} name="countries" className="d-inline fs-1 py-0-5" />
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
