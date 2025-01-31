'use client';

import { Skeleton, Stack } from '@mui/material';

const TextLoader = () => (
  <Stack gap={2} direction="column" justifyContent="space-between">
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="text" width="100%" height={20} />
  </Stack>
);

const CafeInfoLoader = () => {
  return (
    <Stack gap={3} direction="column" maxWidth="400px">
      <Skeleton variant="text" width="100%" height={60} />
      <TextLoader />
      <Stack gap={1} direction="row" overflow="hidden">
        <Skeleton variant="rectangular" width={200} height={120} sx={{ flexShrink: 0 }} />
        <Skeleton variant="rectangular" width={200} height={120} sx={{ flexShrink: 0 }} />
      </Stack>
      <TextLoader />
    </Stack>
  );
};

export default CafeInfoLoader;
