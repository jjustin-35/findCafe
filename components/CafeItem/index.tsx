import Image from 'next/image';
import Link from 'next/link';
import { Stack, Typography, Rating, Chip } from '@mui/material';
import { CafeData } from '@/constants/types';
import { calculateRank, getTags } from '@/helpers/rankAndTags';
import { tagData } from './data';

const CafeListItem = ({ cafe }: { cafe: CafeData }) => {
  const { images, address, name } = cafe;
  const path = `/cafe/${name}`;
  const firstImg = images[0];
  const stars = calculateRank(cafe);
  const tags = getTags(cafe);

  return (
    <Link href={path}>
      <Stack gap={2}>
        <Image src={firstImg.src} alt={firstImg.alt} width={100} height={100} />
        <Stack direction="column" alignItems="center" gap={1}>
          <Typography variant="h4" component="h3" color="primary">
            {name}
          </Typography>
          <Rating value={stars} readOnly />
          <Stack direction="row" gap={1}>
            {tags.map((tag) => (
              <Chip key={tag} label={tagData[tag]} />
            ))}
          </Stack>
          <Typography variant="body1" component="p" color="text.secondary">
            {address}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
};

export default CafeListItem;
