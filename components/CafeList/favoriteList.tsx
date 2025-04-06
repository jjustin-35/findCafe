'use client';

import { useRouter } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CafeData } from '@/constants/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCafeDetail } from '@/redux/cafes';
import useFavorite from '@/helpers/useFavorite';
import CafeItem from './item';

const FavoriteList = () => {
  const router = useRouter();
  const { favoriteCafes, addFavorite, removeFavorite } = useFavorite();
  const dispatch = useAppDispatch();

  const moveTo = (cafe: CafeData) => {
    router.push(`/cafe`);
    setTimeout(() => {
      dispatch(setCafeDetail(cafe));
    }, 500);
  };

  const content = (() => {
    if (!favoriteCafes?.length) {
      return (
        <Typography color={grey[500]} variant="h6" fontWeight="bold" textAlign="center">
          沒有找到咖啡廳
        </Typography>
      );
    }

    return (
      <Stack gap={3} direction="column">
        {favoriteCafes?.map((cafe) => (
          <Box
            key={cafe.id}
            border={1}
            borderColor={grey[400]}
            borderRadius={2}
            p={2}
            sx={{
              cursor: 'pointer',
              ':hover': { boxShadow: '0 0px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' },
            }}
          >
            <CafeItem
              cafe={cafe}
              moveTo={moveTo}
              isFavorite={true}
              isCafeDetail={false}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </Box>
        ))}
      </Stack>
    );
  })();

  return content;
};

export default FavoriteList;
