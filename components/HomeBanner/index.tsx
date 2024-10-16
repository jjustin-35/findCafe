'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { AppDispatch, RootState } from '@/config/configureStore';
import { getAreas } from '@/redux/search';

import Select from '@/components/Select';

const HomeBanner = () => {
  const { areas } = useSelector((state: RootState) => state.search);
  const [keyword, setKeyword] = useState<string>('');
  const [countries, setCountries] = useState<string[]>(['請選擇']);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!areas?.length) {
      dispatch(getAreas());
      return;
    }
    const areaNames = areas.map((area) => area.name);
    setCountries([...countries, ...areaNames]);
  }, [areas]);
  return (
    <div className="container-fluid bg-img banner d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col offset-md-1">
            <h1 className="banner__title fw-bold text-white text-center text-md-start">找到專屬於你的咖啡廳</h1>
            <div className="mb-1 d-flex justify-content-center justify-content-md-start">
              <FormProvider {...useForm()}>
                <input
                  type="text"
                  name="keyword"
                  placeholder="搜尋關鍵字"
                  className="me-md-1 me-0-5 p-0-5 fs-1 rounded-2 banner__search"
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                />
                <Select opt={countries} name="countries" className="d-inline fs-1 py-0-5" />
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
