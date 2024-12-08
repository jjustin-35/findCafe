import { Suspense } from 'react';
import { Stack, Box } from '@mui/material';
import { CafeData } from '@/constants/types';
import CafeListLoader from '../Loaders/cafeList';
import CafeListItem from './item';

const List = ({ cafes }: { cafes: CafeData[] }) => {
  return (
    <Box
      component="section"
      sx={{
        p: 3,
        borderRadius: 2,
        width: '100%',
        maxWidth: {
          mobile: '100%',
          laptop: '500px',
        },
      }}
    >
      <Suspense fallback={<CafeListLoader />}>
        <Stack gap={2} direction="column">
          {cafes?.map((cafe) => (
            <CafeListItem key={cafe.id} cafe={cafe} />
          ))}
        </Stack>
      </Suspense>
    </Box>
  );
};

export default List;
