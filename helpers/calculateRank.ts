import { ApiCafeType } from '@/constants/types';

type Ranks = Pick<ApiCafeType, 'wifi' | 'seat' | 'quiet' | 'tasty' | 'cheap' | 'music'>;

const calculateRank = (ranks: Ranks) => {
  const rankSum = Object.keys(ranks).reduce((acc, key) => {
    return acc + ranks[key];
  }, 0);

  const rank = Math.round(rankSum / Object.keys(ranks).length);

  return rank;
};

export default calculateRank;
