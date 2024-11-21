'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

import { Container } from '@/style/styles';
import { HomeBannerImage, SearchWrapper, Title } from './styled';

const HomeBanner = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

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
              sx={{ backgroundColor: 'white', borderRadius: '4px', width: '100%', maxWidth: '400px' }}
              {...register('keyword')}
            />
            <Button type="submit" variant="contained" color="secondary" sx={{ borderRadius: '24px' }}>
              搜尋
            </Button>
          </SearchWrapper>
        </form>
      </Container>
    </HomeBannerImage>
  );
};

export default HomeBanner;
