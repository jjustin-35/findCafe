'use client';

import { Skeleton, Stack } from '@mui/material';

const Item = () => {
  return (
    <Stack gap={2}>
      <Skeleton variant="rectangular" width={100} height={60} />
      <Stack gap={2} direction="column" justifyContent="space-between">
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
      </Stack>
    </Stack>
  );
};

const CafeListLoader = () => {
  return (
    <Stack gap={2} direction="column">
      {[...Array(3)].map((_, index) => (
        <Item key={index} />
      ))}
    </Stack>
  );
};

export default CafeListLoader;
