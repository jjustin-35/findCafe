'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getAreas } from '@/apis/search';

import Select from '@/components/Select';

const HomeBanner = () => {
  const [allArea, setAllArea] = useState<string[]>(['請選擇']);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (allArea.length === 1) {
        const areas = await getAreas();
        const areaNames = areas.map((area) => area.name);
        setAllArea([...allArea, ...areaNames]);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<{ keyword: string; area: string }> = async ({ keyword, area }) => {
    router.push(`/search?keyword=${keyword}&area=${area}`);
  };

  return (
    <div className="container-fluid bg-img banner d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col offset-md-1">
            <h1 className="banner__title fw-bold text-white text-center text-md-start">找到專屬於你的咖啡廳</h1>
            <div className="mb-1 d-flex justify-content-center justify-content-md-start">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="搜尋關鍵字"
                    className="me-md-1 me-0-5 p-0-5 fs-1 rounded-2 banner__search"
                    {...register('keyword')}
                  />
                  <Select opt={allArea} name="area" className="d-inline fs-1 py-0-5" register={register} />
                </div>
                <button type="submit" className="btn btn-primary rounded-pill">
                  搜尋
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
