'use client';

import { Stack } from '@mui/material';
import type { ImageData } from '@/constants/types';
import { Image } from './styled';

const Images = ({ images }: { images: ImageData[] }) => {
  if (!images?.length) return null;
  return (
    <Stack direction="row" gap={1} justifyContent="center" flexWrap="wrap" width="100%">
      {images.map((image) => (
        <Image key={image.alt} loading="lazy" src={image.src} alt={image.alt} />
      ))}
    </Stack>
  );
};

export default Images;
