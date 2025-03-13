'use client';

import { styled } from '@mui/material';
import { Container } from '@/style/styles';
import ImageTextBanner from '@/components/ImageTextBanner';
import data from './data';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { getAreas } from '@/redux/cafes';

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  marginBottom: '40px',
}));

const HomeIntro = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  return (
    <>
      {data.map((item, idx) => (
        <Wrapper key={idx}>
          <Container>
            <ImageTextBanner {...item} />
          </Container>
        </Wrapper>
      ))}
    </>
  );
};

export default HomeIntro;
