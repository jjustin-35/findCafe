'use client';

import Image from 'next/image';
import { Stack, Typography, Rating, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCafes } from '@/redux/cafes';
import { CafeData } from '@/constants/types';
import { getTags } from '@/helpers/rankAndTags';
import tagData from '@/constants/tags';

const CafeListItem = ({ cafe }: { cafe: CafeData }) => {
  const dispatch = useAppDispatch();
  const { isCafeDetail } = useAppSelector((state) => state.cafes);
  const { images, address, name } = cafe;
  const firstImg = images?.[0];
  const rating = Math.round(cafe?.rating || 0);
  const tags = getTags(cafe);

  const onClick = () => {
    if (isCafeDetail) return;
    dispatch(getCafes({
      keyword: cafe.name,
      position: { lat: cafe.latitude, lng: cafe.longitude },
      isCafeDetail: true,
      isSearching: true
    }));
  };

  return (
    <Stack gap={2} onClick={onClick} sx={{ cursor: isCafeDetail ? 'default' : 'pointer' }}>
      {firstImg && <Image src={firstImg.src} alt={firstImg.alt} width={100} height={100} />}
      <Stack direction="column" gap={1}>
        <Typography variant="h6" component="h3" color="primary">
          {name}
        </Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <Rating value={rating} readOnly />
          <Typography variant="body1" component="span">{!cafe?.rating ? '未評分' : rating}</Typography>
        </Stack>
        {tags?.length > 0 && (
          <Stack direction="row" gap={1} flexWrap="wrap" width="100%">
            {tags.map((tag) => (
              <Chip key={tag} label={tagData[tag]} />
            ))}
          </Stack>
        )}
        <Typography variant="body1" component="p" color="text.secondary">
          {address}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CafeListItem;
