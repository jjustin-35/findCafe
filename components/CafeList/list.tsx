import { Stack, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CafeData } from '@/constants/types';
import { useAppSelector } from '@/redux/hooks';
import CafeListLoader from '../Loaders/cafeList';
import CafeListItem from './item';

const List = ({ cafes }: { cafes: CafeData[] }) => {
  const { isLoading } = useAppSelector((state) => state.search);

  const content = (() => {
    if (isLoading) {
      return <CafeListLoader />;
    }

    if (!cafes?.length) {
      return (
        <Typography color={grey[500]} variant="h6" fontWeight="bold" textAlign="center">
          沒有找到咖啡廳
        </Typography>
      );
    }

    return (
      <Stack gap={2} direction="column">
        {cafes?.map((cafe) => (
          <CafeListItem key={cafe.id} cafe={cafe} />
        ))}
      </Stack>
    );
  })();

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
      {content}
    </Box>
  );
};

export default List;
