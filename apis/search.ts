'use server';

import prisma from '@/lib/prisma';
import { ApiCafeData, CafeData, SearchCafesData } from '@/constants/types';
import { API_PATHS } from '@/constants/apiPaths';
import { calculateRank } from '@/helpers/rankAndTags';

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
  const { areaKey, district, location, position, keyword, rank } = data;

  const distance = 0.01;
  const scope = position && {
    minLat: position.lat - distance,
    maxLat: position.lat + distance,
    minLng: position.lng - distance,
    maxLng: position.lng + distance,
  };

  try {
    const resp = await fetch(`${API_PATHS.NOMAD_CAFE_API}${areaKey || ''}`, {
      // cache: 'force-cache',
      next: {
        revalidate: 3600,
      }
    });
    const cafes: ApiCafeData[] = await resp.json();

    if (!cafes.length) return [];

    // handle conditions
    const filteredCafes = cafes
      .map((cafe) => ({
        ...cafe,
        latitude: parseFloat(cafe.latitude),
        longitude: parseFloat(cafe.longitude),
        cafeRank: calculateRank(cafe),
      }))
      .filter((cafe) => {
        const { name, address, latitude, longitude, cafeRank } = cafe;

        const isKeywordMatched = !keyword || name.includes(keyword) || address.includes(keyword);
        const isDistrictMatched = !district || address.includes(district);
        const isLocationMatched = !location || address.includes(location);
        const isGteRank = !rank || cafeRank >= rank;
        const isInScope =
          !position ||
          (latitude >= scope.minLat &&
            latitude <= scope.maxLat &&
            longitude >= scope.minLng &&
            longitude <= scope.maxLng);

        return isKeywordMatched && isDistrictMatched && isLocationMatched && isGteRank && isInScope;
      })
      .sort((a, b) => b.cafeRank - a.cafeRank);

    return filteredCafes;
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
