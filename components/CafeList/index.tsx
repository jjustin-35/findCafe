'use client';

import { Suspense } from 'react';
import { Stack, Box } from '@mui/material';
import { CafeData } from '@/constants/types';
import CafeListLoader from '../Loaders/cafeList';
import CafeListItem from './item';

const CafeList = ({ data }: { data: CafeData[] }) => {
  return (
    <Box component="section" sx={{ p: 3, borderRadius: 2, bgcolor: 'secondary.main' }}>
      <Suspense fallback={<CafeListLoader />}>
        {data?.length && (
          <Stack gap={2} direction="column">
            {data.map((cafe) => (
              <CafeListItem key={cafe.id} cafe={cafe} />
            ))}
          </Stack>
        )}
      </Suspense>
    </Box>
  );
};

export default CafeList;
