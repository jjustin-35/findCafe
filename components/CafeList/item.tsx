'use client';

import { Stack, Typography, Rating, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCafeDetails } from '@/redux/cafes';
import { CafeData, Position } from '@/constants/types';
import { getTags } from '@/helpers/rankAndTags';
import tagData from '@/constants/tags';
import Images from '../Images';

const CafeListItem = ({ cafe, moveTo }: { cafe: CafeData; moveTo: (position: Position) => void }) => {
  const dispatch = useAppDispatch();
  const { isCafeDetail } = useAppSelector((state) => state.cafes);
  const { images, address, name } = cafe;
  const rating = Math.round(cafe?.rating || 0);
  const tags = getTags(cafe);

  const onClick = () => {
    if (isCafeDetail) return;
    dispatch(getCafeDetails({ cafe }));
    moveTo({ lat: cafe.latitude, lng: cafe.longitude });
  };

  return (
    <Stack gap={2} onClick={onClick} sx={{ cursor: isCafeDetail ? 'default' : 'pointer' }}>
      <Stack direction="column" gap={1}>
        <Typography variant="h6" component="h3" color="primary">
          {name}
        </Typography>
        {isCafeDetail && (
          <Stack direction="row" gap={1} alignItems="center">
            <Rating value={rating} readOnly />
            <Typography variant="body1" component="span">
              {!cafe?.rating ? '未評分' : rating}
            </Typography>
          </Stack>
        )}
        {tags?.length > 0 && (
          <Stack direction="row" gap={1} flexWrap="wrap" width="100%">
            {tags.map((tag) => (
              <Chip key={tag} label={tagData[tag]} />
            ))}
          </Stack>
        )}
        <Typography marginBottom={1} variant="body1" component="p" color="text.secondary">
          {address}
        </Typography>
        <Images images={images} />
      </Stack>
    </Stack>
  );
};

export default CafeListItem;
