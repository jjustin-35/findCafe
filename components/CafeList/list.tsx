import { Stack, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CafeData } from '@/constants/types';
import CafeListLoader from '../Loaders/cafeList';
import CafeItem from '../CafeItem';

const List = ({ cafes, isLoading }: { cafes: CafeData[]; isLoading?: boolean }) => {
  const content = (() => {
    if (!cafes || isLoading) {
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
      <Stack gap={3} direction="column">
        {cafes?.map((cafe) => (
          <CafeItem key={cafe.id} cafe={cafe} />
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
