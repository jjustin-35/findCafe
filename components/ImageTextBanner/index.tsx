'use client';

import Image from 'next/image';
import { Stack, Typography, TypographyOwnProps } from '@mui/material';
import { ImageData } from '@/constants/types';
export interface ImageTextBannerProps {
  data: {
    image: ImageData;
    title: string;
    description: string;
  };
  styles?: {
    title?: TypographyOwnProps;
    description?: TypographyOwnProps;
    isReverse?: boolean;
  };
}

const ImageTextBanner = ({ data, styles }: ImageTextBannerProps) => {
  const { image, title, description } = data;
  return (
    <Stack direction={styles?.isReverse ? 'row-reverse' : 'row'} spacing={2}>
      <Image
        {...image}
        sizes="100vw"
        style={{
          width: '100%',
          maxWidth: '60%',
          height: 'auto',
          objectFit: 'cover'
        }}
        width={785}
        height={450}
      />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ padding: '20px 0', width: '100%', maxWidth: '40%' }}
      >
        <Typography component="h2" variant="h5" color="primary.main" fontWeight="bold" {...styles?.title}>
          {title}
        </Typography>
        <Typography variant="body1" {...styles?.description}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ImageTextBanner;
