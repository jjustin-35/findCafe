import { CafeData } from '@/constants/types';

const getRanks = (cafe: CafeData) => {
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

export const calculateRank = (cafe: CafeData) => {
  const ranks = getRanks(cafe);
  const rankSum = Object.keys(ranks).reduce((acc, key) => {
    return acc + ranks[key];
  }, 0);

  const rank = Math.round(rankSum / Object.keys(ranks).length);

  return rank;
};

export const getTags = (cafe: CafeData) => {
  const ranks = getRanks(cafe);
  const tags = Object.keys(ranks).filter((key) => ranks[key] >= 4);

  return tags;
};
