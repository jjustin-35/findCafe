import Image from 'next/image';
import Link from 'next/link';
import { Stack, Typography, Rating, Chip } from '@mui/material';
import { CafeData } from '@/constants/types';

const CafeListItem = ({ cafe }: { cafe: CafeData }) => {
  const { img, address, tags, name } = cafe;
  const path = `/cafe/${name}`;
  const stars = Math.round(cafe.stars);
  return (
    <Link href={path}>
      <Stack gap={2}>
        <Image src={img[0].pic} alt={img[0].name} width={100} height={100} />
        <Stack direction="column" alignItems="center" gap={1}>
          <Typography variant="h4" component="h3" color="primary">
            {name}
          </Typography>
          <Rating value={stars} readOnly />
          <Stack direction="row" gap={1}>
            {tags.map((tag) => (
              <Chip key={tag.id} label={tag.name} />
            ))}
          </Stack>
          <Typography variant="body1" component="p" color="text.secondary">
            {address.location}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default CafeListItem;
