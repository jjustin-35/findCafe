'use client';

import { Stack } from '@mui/material';
import type { ImageData } from '@/constants/types';

const Images = ({ images }: { images: ImageData[] }) => {
  if (!images?.length) return null;
  return (
    <Stack direction="row" gap={1} flexWrap="wrap" width="100%">
      {images.map((image) => (
        <img key={image.alt} loading="lazy" src={image.src} alt={image.alt} width={100} height={100} />
      ))}
    </Stack>
  );
};

export default Images;
