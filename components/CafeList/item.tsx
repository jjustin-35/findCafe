import Image from 'next/image';
import { Box, Stack, Typography, Rating, Chip } from '@mui/material';
import { Prisma } from '@prisma/client';

interface ItemProps {
  cafe: Prisma.CafeGetPayload<{
    include: {
      img: true;
      address: true;
      tags: true;
    };
  }>;
}

const CafeListItem = ({ cafe }: ItemProps) => {
  const { img, address, phone, tags } = cafe;
  const stars = Math.round(cafe.stars);
  return (
    <Stack gap={2}>
      <Image src={img[0].pic} alt={img[0].name} width={100} height={100} />
      <Stack direction="column" alignItems="center" gap={1}>
        <Typography variant="h4" component="h3" color="primary">
          {cafe.name}
        </Typography>
        <Rating value={stars} readOnly />
        <Stack direction="row" gap={1}>
          {tags.map((tag) => (
            <Chip key={tag.id} label={tag.name} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CafeListItem;
