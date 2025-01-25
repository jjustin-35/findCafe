import { ApiCafeType, CafeData } from '@/constants/types';

export const cafeDataTransform = (data: ApiCafeType[]): CafeData[] => {
  const cafeData = data.map((item) => {
    const { id, name, open_time, limited_time, mrt, url, wifi, seat, quiet, tasty, cheap, music } = item;
    const rank = { wifi, seat, quiet, tasty, cheap, music };
    return {
      cafeId: id,
      name,
      url,
      rank,
    };
  });

  return cafeData;
};
