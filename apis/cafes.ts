'use server';

import prisma from '@/lib/prisma';
import { ApiCafeData, CafeData, SearchCafesData } from '@/constants/types';
import { API_PATHS } from '@/constants/apiPaths';
import { delay } from '@/helpers/time';
import { generateKey, getCache, setCache } from '@/lib/apiCache';
import { tags as allTags } from '@/constants/tags';

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

export const getCafes = async (data: SearchCafesData): Promise<CafeData[]> => {
  const { areaKey, district, location, position, keyword, tags, rating } = data;

  const distance = 0.01;
  const scope = position && {
    minLat: position.lat - distance,
    maxLat: position.lat + distance,
    minLng: position.lng - distance,
    maxLng: position.lng + distance,
  };

  try {
    let cafes: ApiCafeData[];
    const revalidate = 3600;
    const cacheKey = generateKey('getCafes', { data });
    const cachedData = getCache<ApiCafeData[]>(cacheKey);
    if (cachedData?.length) {
      cafes = cachedData;
      await delay(300);
    } else {
      const response = await fetch(API_PATHS.NOMAD_CAFE_API);
      cafes = await response.json();
      setCache(cacheKey, {
        data: cafes,
        expireAt: Date.now() + revalidate * 1000,
      });
    }

    let filteredCafes: CafeData[] = cafes?.length
      ? cafes.map((cafe) => {
          const averageRating = allTags.reduce((acc, tag) => acc + (cafe?.[tag] || 0), 0) / allTags.length;
          return {
            ...cafe,
            rating: averageRating,
            latitude: Number(cafe.latitude),
            longitude: Number(cafe.longitude),
          };
        })
      : [];

    // Filter by area/district if specified
    if (areaKey || district) {
      filteredCafes = filteredCafes?.filter((cafe) => {
        if (areaKey && !cafe.city.includes(areaKey)) return false;
        if (district && !cafe.address.includes(district)) return false;
        return true;
      });
    }

    // Filter by rating if specified
    if (rating) {
      filteredCafes = filteredCafes.filter((cafe) => {
        return cafe.rating >= rating;
      });
    }

    // Filter by location if specified
    if (location) {
      filteredCafes = filteredCafes.filter((cafe) => cafe.address.includes(location) || cafe.city.includes(location));
    }

    // Filter by position if specified
    if (scope) {
      filteredCafes = filteredCafes.filter((cafe) => {
        const lat = cafe.latitude;
        const lng = cafe.longitude;
        return lat >= scope.minLat && lat <= scope.maxLat && lng >= scope.minLng && lng <= scope.maxLng;
      });
    }

    // Filter by keyword if specified
    if (keyword) {
      const searchKeyword = keyword.toLowerCase();
      filteredCafes = filteredCafes.filter((cafe) => {
        return cafe.name.toLowerCase().includes(searchKeyword) || cafe.address.toLowerCase().includes(searchKeyword);
      });
    }

    // Filter by tags if specified
    if (tags && tags.length > 0) {
      filteredCafes = filteredCafes.filter((cafe) => {
        return tags.every((tag) => (cafe?.[tag] || 0) >= 4);
      });
    }

    // sort by rating
    filteredCafes = filteredCafes.sort((a, b) => b.rating - a.rating);

    return filteredCafes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
