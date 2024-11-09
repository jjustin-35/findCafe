'use client';

import { Container } from '@/style/styles';
import ImageTextBanner from '@/components/ImageTextBanner';
import data from './data';

const HomeIntro = () => {
  return (
    <Container>
      {data.map((item, idx) => (
        <ImageTextBanner key={idx} {...item} />
      ))}
    </Container>
  );
};

export default HomeIntro;
