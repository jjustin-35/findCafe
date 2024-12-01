'use server';

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { isEmpty } from '@/helpers/object';
import { SearchCafesData } from '@/constants/types';

export const getAreas = async () => {
  try {
    const allAreas = await prisma.area.findMany({
      include: {
        districts: true,
      },
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

export const searchCafes = async (data: SearchCafesData) => {
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
    return cafes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
