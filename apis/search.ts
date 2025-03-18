'use server';

import prisma from '@/lib/prisma';
import { ApiCafeData, CafeData, MapApiCafeData, SearchCafesData } from '@/constants/types';
import { API_PATHS } from '@/constants/apiPaths';
import { delay } from '@/helpers/time';
import { calculateDistance } from '@/helpers/caculateDistance';

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

let cacheData: { data: ApiCafeData[] | null; expireAt: number | null } = { data: null, expireAt: null };

export const getCafesData = async (cafes: MapApiCafeData[], query: SearchCafesData): Promise<CafeData[]> => {
  const { areaKey, district, location, keyword, tags } = query;
  try {
    let cafeList: ApiCafeData[];
    const revalidate = 3600;
    if (cacheData?.data && cacheData.expireAt > Date.now()) {
      cafeList = cacheData.data;
      await delay(300);
    } else {
      const response = await fetch(API_PATHS.NOMAD_CAFE_API);
      cafeList = await response.json();
      cacheData = {
        data: cafeList,
        expireAt: Date.now() + revalidate * 1000,
      };
    }

    let filteredCafes = cafeList.reduce<CafeData[]>((acc, cafeItem) => {
      const cafe = cafes.find(cafe => {
        // unit: km
        const maxDistance = 0.2;

        const cafeItemLat = parseFloat(cafeItem.latitude);
        const cafeItemLng = parseFloat(cafeItem.longitude);

        const distance = calculateDistance(
          { lat: cafeItemLat, lng: cafeItemLng },
          { lat: cafe.location.lat, lng: cafe.location.lng }
        );

        // if distance is less than maxDistance, means the cafe is close to the location, return true
        return distance <= maxDistance;
      });

      if (cafe) {
        const newCafe = {
          ...cafeItem,
          ...cafe,
          latitude: parseFloat(cafeItem.latitude),
          longitude: parseFloat(cafeItem.longitude),
        };
        acc.push(newCafe);
      }
      return acc;
    }, []);

    // Filter by area/district if specified
    if (areaKey || district) {
      filteredCafes = filteredCafes.filter((cafe) => {
        if (areaKey && !cafe.city.includes(areaKey)) return false;
        if (district && !cafe.address.includes(district)) return false;
        return true;
      });
    }

    // Filter by location if specified
    if (location) {
      filteredCafes = filteredCafes.filter((cafe) =>
        cafe.address.includes(location) || cafe.city.includes(location)
      );
    }

    // Filter by keyword if specified
    if (keyword) {
      const searchKeyword = keyword.toLowerCase();
      filteredCafes = filteredCafes.filter((cafe) => {
        return (
          cafe.name.toLowerCase().includes(searchKeyword) ||
          cafe.address.toLowerCase().includes(searchKeyword)
        );
      });
    }

    // Filter by tags if specified
    if (tags && tags.length > 0) {
      filteredCafes = filteredCafes.filter((cafe) => {
        return tags.every(tag => {
          switch (tag) {
            case 'wifi':
              return cafe.wifi >= 4;
            case 'seat':
              return cafe.seat >= 4;
            case 'quiet':
              return cafe.quiet >= 4;
            case 'tasty':
              return cafe.tasty >= 4;
            case 'cheap':
              return cafe.cheap >= 4;
            case 'music':
              return cafe.music >= 4;
            default:
              return true;
          }
        });
      });
    }

    return filteredCafes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
