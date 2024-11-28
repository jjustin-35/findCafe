'use client';

import { Stack, Box } from '@mui/material';
import CafeListItem, { CafeItemProps } from './item';

const CafeList = ({ data }: { data: CafeItemProps[] }) => {
  return (
    <Box component="section" sx={{ p: 3, borderRadius: 2, bgcolor: 'secondary.main' }}>
      <Stack gap={2}>
        {data.map((cafe) => (
          <CafeListItem key={cafe.id} cafe={cafe} />
        ))}
      </Stack>
    </Box>
  );
};

export default CafeList;
