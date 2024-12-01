'use client';

import { Suspense } from 'react';
import { Stack, Box } from '@mui/material';
import { CafeData } from '@/constants/types';
import CafeListLoader from '../Loaders/cafeList';
import CafeListItem from './item';

const CafeList = ({ cafes }: { cafes: CafeData[] }) => {
  return (
    <Box component="section" sx={{ p: 3, borderRadius: 2, bgcolor: 'secondary.main' }}>
      <Suspense fallback={<CafeListLoader />}>
        {cafes?.length && (
          <Stack gap={2} direction="column">
            {cafes.map((cafe) => (
              <CafeListItem key={cafe.id} cafe={cafe} />
            ))}
          </Stack>
        )}
      </Suspense>
    </Box>
  );
};

export default CafeList;
