'use server';

import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

type DistrictData = {
  zip: number;
  name: string;
};

type AreaData = {
  name: string;
  districts: DistrictData[];
};

export const getAreas = async () => {
  try {
    const allAreas = await prisma.area.findMany({
      include: {
        districts: true,
      }
    });
  if (!allAreas?.length) {
    const data: AreaData[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../taiwan_districts.json'), 'utf-8'));
    const areas = data.map((area) => {
      return {
        name: area.name,
        districts: area.districts.map((district) => {
          return {
            zipcode: district.zip,
            name: district.name,
          };
        }),
      };
    });
    await prisma.area.createMany({
      data: areas,
    });

    return areas;
    }
    return allAreas;
  } catch (error) {
    console.error(error);
    return [];
  }
};
