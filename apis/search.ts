'use server';

import prisma from '@/lib/prisma';
import { ApiCafeData, CafeData, SearchCafesData } from '@/constants/types';
import { API_PATHS } from '@/constants/apiPaths';
import { calculateRank } from '@/helpers/rankAndTags';
import { delay } from '@/helpers/time';

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

export const getCafes = async (data: SearchCafesData): Promise<CafeData[]> => {
  const { areaKey, district, location, position, keyword, rank, tags } = data;

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
    if (cacheData?.data && cacheData.expireAt > Date.now()) {
      cafes = cacheData.data;
      await delay(300);
    } else {
      const response = await fetch(API_PATHS.NOMAD_CAFE_API);
      cafes = await response.json();
      cacheData = {
        data: cafes,
        expireAt: Date.now() + revalidate * 1000,
      };
    }

    let filteredCafes = cafes;

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

    // Filter by position if specified
    if (scope) {
      filteredCafes = filteredCafes.filter((cafe) => {
        const lat = parseFloat(cafe.latitude);
        const lng = parseFloat(cafe.longitude);
        return (
          lat >= scope.minLat &&
          lat <= scope.maxLat &&
          lng >= scope.minLng &&
          lng <= scope.maxLng
        );
      });
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

    // Filter by minimum rating if specified
    if (rank) {
      filteredCafes = filteredCafes.filter((cafe) => {
        const cafeRank = calculateRank(cafe);
        return cafeRank >= rank;
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

    // Transform the filtered cafes to include rank
    return filteredCafes.map((cafe) => ({
      ...cafe,
      rating: calculateRank(cafe),
      latitude: parseFloat(cafe.latitude),
      longitude: parseFloat(cafe.longitude),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// export const searchCafes = async (data: SearchCafesData) => {
//   if (!data) return [];

//   const { area, district, location, position, keyword, rank, advantages } = data;

//   // position
//   let positionOptions: Prisma.CafeAddressWhereInput = {};
//   if (position) {
//     const scope = 0.01;
//     const minLat = position.lat - scope;
//     const maxLat = position.lat + scope;
//     const minLng = position.lng - scope;
//     const maxLng = position.lng + scope;

//     positionOptions = {
//       latitude: {
//         gte: minLat,
//         lte: maxLat,
//       },
//       longitude: {
//         gte: minLng,
//         lte: maxLng,
//       },
//     };
//   }

//   const address: Prisma.CafeAddressWhereInput = {
//     ...(area && { area }),
//     ...(district && { district }),
//     ...(location && {
//       location: {
//         contains: location,
//         mode: 'insensitive',
//       },
//     }),
//     ...positionOptions,
//   };

//   const keywordOptions: Prisma.StringFilter = {
//     contains: keyword,
//     mode: 'insensitive',
//   };

//   const keywordSearch: Prisma.CafeWhereInput = {
//     ...(keyword && {
//       name: keywordOptions,
//       description: keywordOptions,
//       tags: {
//         some: {
//           name: keywordOptions,
//         },
//       },
//       address: {
//         area: keywordOptions,
//         district: keywordOptions,
//         location: keywordOptions,
//       },
//     }),
//   };

//   const searchOptions: Prisma.CafeFindManyArgs = {
//     where: {
//       ...(!isEmpty(address) && {
//         address,
//       }),
//       ...keywordSearch,
//       ...(rank && {
//         stars: {
//           gte: rank,
//         },
//       }),
//       ...(advantages && {
//         tags: {
//           some: {
//             name: {
//               in: advantages,
//             },
//           },
//         },
//       }),
//     },
//   };

//   try {
//     const cafes = await prisma.cafe.findMany({
//       include: {
//         address: true,
//         tags: true,
//         img: true,
//       },
//       ...searchOptions,
//     });

//     console.log(cafes);

//     return cafes;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
