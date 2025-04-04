import { tagsWithRatingKeys, tagsWithoutRatingKeys } from '@/constants/tags';
import { CafeData } from '@/constants/types';

export const getTags = (cafe: CafeData) => {
  if (!cafe) return [];
  const ratingTags = tagsWithRatingKeys.filter((key) => (cafe[key] || 0) >= 4);
  const withoutRatingTags = tagsWithoutRatingKeys.filter((key) => {
    if (key === 'limited_time') return cafe[key] === 'no';
    return cafe[key] === 'yes' || cafe[key] === 'maybe';
  });
  return [...ratingTags, ...withoutRatingTags];
};
