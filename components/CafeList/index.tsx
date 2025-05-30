import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CafeData, Status } from '@/constants/types';
import useFavorite from '@/helpers/useFavorite';
import CafeBoard from '../CafeBoard';
import CafeListLoader from '../Loaders/Cafe/cafeList';
import CafeItem from './item';

const List = ({
  cafes,
  isCafeDetail,
  status,
  moveTo,
}: {
  cafes: CafeData[];
  isCafeDetail: boolean;
  status: Status;
  moveTo: (cafe: CafeData) => void;
}) => {
  const { favoriteCafes, addFavorite, removeFavorite } = useFavorite();
  const content = (() => {
    if (status === Status.IDLE || status === Status.PENDING) {
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
        {cafes?.map((cafe) => {
          const isFavorite = favoriteCafes.some((item) => item.id === cafe.id);
          return (
            <CafeItem
              key={cafe.id}
              cafe={cafe}
              moveTo={moveTo}
              isFavorite={isFavorite}
              isCafeDetail={isCafeDetail}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          );
        })}
      </Stack>
    );
  })();

  return (
    <CafeBoard cafes={cafes} title="咖啡廳">
      {content}
    </CafeBoard>
  );
};

export default List;
