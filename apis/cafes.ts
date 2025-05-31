'use server';

import prisma from '@/lib/prisma';
import { ApiCafeData, CafeData } from '@/constants/types';
import { PATHS } from '@/constants/paths';
import { delay } from '@/helpers/time';
import { generateKey, getCache, setCache } from '@/lib/apiCache';

export const getAreas = async (city?: string) => {
  try {
    const allAreas = await prisma.area.findMany({
      include: {
        districts: true,
      },
      ...(city && {
        where: {
          name: {
            contains: city,
          },
        },
      }),
      orderBy: {
        order: 'asc',
      },
    });

    return allAreas;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCafes = async (): Promise<CafeData[]> => {
  try {
    let cafes: ApiCafeData[];
    const revalidate = 3600;
    const cacheKey = generateKey('getCafes', {});
    const cachedData = getCache<ApiCafeData[]>(cacheKey);
    if (cachedData?.length) {
      cafes = cachedData;
      await delay(300);
    } else {
      const response = await fetch(PATHS.NOMAD_CAFE_API);
      cafes = await response.json();
      setCache(cacheKey, {
        data: cafes,
        expireAt: Date.now() + revalidate * 1000,
      });
    }

    const newCafes: CafeData[] = cafes?.length
      ? cafes.map((cafe) => {
          return {
            ...cafe,
            latitude: Number(cafe.latitude),
            longitude: Number(cafe.longitude),
          };
        })
      : [];

    return newCafes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
