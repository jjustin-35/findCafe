'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

import { getAreas } from '@/apis/search';

import { Container } from '@/style/styles';
import Select from '@/components/Select';
import { HomeBannerImage, SearchWrapper, Title } from './styled';

const HomeBanner = () => {
  const [allArea, setAllArea] = useState<string[]>(['請選擇']);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (allArea.length <= 1) {
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
    <HomeBannerImage>
      <Container>
        <Title>找到專屬於你的咖啡廳</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchWrapper>
            <TextField
              type="text"
              placeholder="搜尋關鍵字"
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: '4px', width: '418px' }}
              {...register('keyword')}
            />
            <Select opt={allArea} name="area" register={register} />
          </SearchWrapper>
          <Button type="submit" variant="contained" sx={{ borderRadius: '24px' }}>
            搜尋
          </Button>
        </form>
      </Container>
    </HomeBannerImage>
  );
};

export default HomeBanner;
