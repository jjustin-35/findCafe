'use client';

import { Stack, Typography, TypographyOwnProps } from '@mui/material';
import { ImageData } from '@/constants/types';
import { Image } from './styled';

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
    <Stack
      direction={{
        mobile: 'column',
        laptop: styles?.isReverse ? 'row-reverse' : 'row',
      }}
      spacing={2}
    >
      <Image
        {...image}
        sizes="100vw"
        width={785}
        height={450}
      />
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{
          padding: '20px 0',
          width: '100%',
          maxWidth: { mobile: '100%', laptop: '40%' },
        }}
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
