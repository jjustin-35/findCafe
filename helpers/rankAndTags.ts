import { CafeData, ApiCafeData } from '@/constants/types';

const getRanks = (cafe: CafeData | ApiCafeData) => {
  const { wifi, seat, quiet, tasty, cheap, music } = cafe;
  return {
    wifi,
    seat,
    quiet,
    tasty,
    cheap,
    music,
  };
};

export const getTags = (cafe: CafeData) => {
  const ranks = getRanks(cafe);
  const tags = Object.keys(ranks).filter((key) => ranks[key] >= 4);

  return tags;
};
