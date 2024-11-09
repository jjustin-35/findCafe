'use client';

import { Box } from '@mui/material';
import { Container } from '@/style/styles';
import { theme } from '@/style/theme';
import ImageTextBanner from '@/components/ImageTextBanner';
import data from './data';

const wrapperStyle = {
  backgroundColor: theme.palette.grey[50],
  marginBottom: '40px',
};

const HomeIntro = () => {
  return (
    <>
      {data.map((item, idx) => (
        <Box key={idx} sx={wrapperStyle}>
          <Container>
            <ImageTextBanner {...item} />
          </Container>
        </Box>
      ))}
    </>
  );
};

export default HomeIntro;
