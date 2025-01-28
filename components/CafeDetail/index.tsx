'use client';

import { Typography, useTheme, useMediaQuery, Stack, Chip, Rating } from '@mui/material';
import CafeBoard from '../CafeBoard';
import { CafeData } from '@/constants/types';
import tagData from '@/constants/tags';
import { getTags } from '@/helpers/rankAndTags';

const CafeDetail = ({ cafe }: { cafe: CafeData }) => {
  const theme = useTheme();
  const { grey } = theme.palette;
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));

  if (!cafe) {
    return (
      <CafeBoard>
        <Typography color={grey[500]} variant="h6" fontWeight="bold" textAlign="center">
          找不到咖啡廳
        </Typography>
      </CafeBoard>
    );
  }

  const { name, address, cafeRank } = cafe;
  const tags = getTags(cafe);

  return (
    <CafeBoard title={name}>
      <Stack direction="column" gap={2}>
        {isDesktop && (
          <Typography variant="h5" component="h3" fontWeight="bold" color="primary">
            {name}
          </Typography>
        )}
        <Rating value={cafeRank} readOnly />
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
    </CafeBoard>
  );
};

export default CafeDetail;
