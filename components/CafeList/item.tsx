'use client';

import { Stack, Typography, Rating, Chip, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch } from '@/redux/hooks';
import { setCafeDetail } from '@/redux/cafes';
import { CafeData } from '@/constants/types';
import { getTags } from '@/helpers/getTags';
import tagData from '@/constants/tags';
import Images from '../Images';

const CafeListItem = ({
  cafe,
  isFavorite,
  isCafeDetail,
  moveTo,
  addFavorite,
  removeFavorite,
}: {
  cafe: CafeData;
  isFavorite: boolean;
  isCafeDetail: boolean;
  moveTo: (cafe: CafeData) => void;
  addFavorite: (cafe: CafeData) => void;
  removeFavorite: (cafe: CafeData) => void;
}) => {
  const dispatch = useAppDispatch();
  const { images, address, name } = cafe;
  const rating = Math.round(cafe?.rating || 0);
  const tags = getTags(cafe);

  const onClick = () => {
    if (isCafeDetail) return;
    dispatch(setCafeDetail(cafe));
    moveTo(cafe);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(cafe);
    } else {
      addFavorite(cafe);
    }
  };

  return (
    <Stack gap={2} onClick={onClick} sx={{ cursor: isCafeDetail ? 'default' : 'pointer' }}>
      <Stack direction="column" gap={1}>
        <Stack direction="row" gap={1} alignItems="start" justifyContent="space-between">
          <Typography variant="h6" component="h3" color="primary" fontSize={{ mobile: 20, tablet: 24 }}>
            {name}
          </Typography>
          <IconButton onClick={handleFavorite}>
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder color="primary" />}
          </IconButton>
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Rating value={rating} readOnly />
          <Typography variant="body1" color="text.secondary" component="span" fontSize={{ mobile: 16, tablet: 20 }}>
            {!cafe?.rating ? '未評分' : rating}
          </Typography>
        </Stack>
        {tags?.length > 0 && (
          <Stack direction="row" gap={1} flexWrap="wrap" width="100%">
            {tags.map((tag) => (
              <Chip key={tag} label={tagData[tag]} />
            ))}
          </Stack>
        )}
        <Typography
          marginBottom={1}
          variant="body1"
          component="p"
          color="text.secondary"
          fontSize={{ mobile: 16, tablet: 20 }}
        >
          {address}
        </Typography>
        {isCafeDetail && (
          <>
            <Typography
              variant="body1"
              component="a"
              href={cafe?.mapLink}
              color="text.secondary"
              fontSize={{ mobile: 16, tablet: 20 }}
            >
              前往 google map →
            </Typography>
            <Images images={images} />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default CafeListItem;
