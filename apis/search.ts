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
  const { area, district, location, keyword, rank, advantages } = data;

  const address = {
    ...(area && { area }),
    ...(district && { district }),
    ...(location && { location }),
  };

  const searchOptions: Prisma.CafeFindManyArgs = {
    where: {
      ...(!isEmpty(address) && {
        address,
      }),
      ...(keyword && {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      }),
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

  const cafes = await prisma.cafe.findMany(searchOptions);
  return cafes;
};
