'use client';

import { Stack, Typography } from '@mui/material';
import { ImageData } from '@/constants/types';
import { Image } from './styled';
export interface ImageTextBannerProps {
  data: {
    image: ImageData;
    title: string;
    description: string;
  };
  isReverse?: boolean;
}

const ImageTextBanner = ({ data, isReverse }: ImageTextBannerProps) => {
  const { image, title, description } = data;
  return (
    <Stack direction={isReverse ? 'row-reverse' : 'row'} spacing={2} sx={{ width: '100%' }}>
      <Image {...image} fill />
      <Stack direction="column" spacing={2} sx={{ padding: '20px 0' }}>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Stack>
    </Stack>
  );
};

export default ImageTextBanner;
