'use server';

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { isEmpty } from '@/helpers/object';
import { ApiCafeType, SearchCafesData } from '@/constants/types';
import { API_PATHS } from '@/constants/apiPaths';

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

export const searchCafesByApi = async (data: SearchCafesData) => {
  const { areaKey, district, location, position, keyword, rank, advantages } = data;

  try {
    const resp = await fetch(`${API_PATHS.NOMAD_CAFE_API}${areaKey}`);
    const cafes: ApiCafeType[] = await resp.json();

    // handle conditionals
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchCafes = async (data: SearchCafesData) => {
  if (!data) return [];

  const { area, district, location, position, keyword, rank, advantages } = data;

  // position
  let positionOptions: Prisma.CafeAddressWhereInput = {};
  if (position) {
    const scope = 0.01;
    const minLat = position.lat - scope;
    const maxLat = position.lat + scope;
    const minLng = position.lng - scope;
    const maxLng = position.lng + scope;

    positionOptions = {
      latitude: {
        gte: minLat,
        lte: maxLat,
      },
      longitude: {
        gte: minLng,
        lte: maxLng,
      },
    };
  }

  const address: Prisma.CafeAddressWhereInput = {
    ...(area && { area }),
    ...(district && { district }),
    ...(location && {
      location: {
        contains: location,
        mode: 'insensitive',
      },
    }),
    ...positionOptions,
  };

  const keywordOptions: Prisma.StringFilter = {
    contains: keyword,
    mode: 'insensitive',
  };

  const keywordSearch: Prisma.CafeWhereInput = {
    ...(keyword && {
      name: keywordOptions,
      description: keywordOptions,
      tags: {
        some: {
          name: keywordOptions,
        },
      },
      address: {
        area: keywordOptions,
        district: keywordOptions,
        location: keywordOptions,
      },
    }),
  };

  const searchOptions: Prisma.CafeFindManyArgs = {
    where: {
      ...(!isEmpty(address) && {
        address,
      }),
      ...keywordSearch,
      ...(rank && {
        stars: {
          gte: rank,
        },
      }),
      ...(advantages && {
        tags: {
          some: {
            name: {
              in: advantages,
            },
          },
        },
      }),
    },
  };

  try {
    const cafes = await prisma.cafe.findMany({
      include: {
        address: true,
        tags: true,
        img: true,
      },
      ...searchOptions,
    });

    console.log(cafes);

    return cafes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
