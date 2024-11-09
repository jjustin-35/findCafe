'use server';

import fs from 'fs';
import path from 'path';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { isEmpty } from '@/helpers/object';
import { AreaData, SearchCafesData } from '@/constants/types';

export const getAreas = async () => {
  try {
    const allAreas = await prisma.area.findMany({
      include: {
        districts: true,
      },
    });
    if (!allAreas?.length) {
      const file = fs.readFileSync('./taiwan_districts.json', 'utf-8');
      const data: AreaData[] = JSON.parse(file);

      const districtsPromises: Promise<Prisma.DistrictCreateManyInput[]>[] = data.map(async (area) => {
        const createdArea = await prisma.area.create({
          data: {
            name: area.name,
          },
        });
        const districts = area.districts.map((district) => ({
          zipcode: parseInt(district.zip),
          name: district.name,
          areaId: createdArea.id,
        }));
        return districts;
      });

      const districts = await Promise.all(districtsPromises);
      await prisma.district.createMany({
        data: districts.flat(),
      });

      return allAreas;
    }
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
