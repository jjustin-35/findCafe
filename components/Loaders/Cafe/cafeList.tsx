'use client';

import { Stack } from '@mui/material';
import Item from './item';

const CafeListLoader = () => {
  return (
    <Stack gap={2} direction="column">
      {[...Array(2)].map((_, index) => (
        <Item key={index} />
      ))}
    </Stack>
  );
};

export default CafeListLoader;
