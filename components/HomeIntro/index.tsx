'use client';

import { styled } from '@mui/material';
import { Container } from '@/style/styles';
import ImageTextBanner from '@/components/ImageTextBanner';
import data from './data';

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  marginBottom: '40px',
}));

const HomeIntro = () => {
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
