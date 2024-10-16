'use server';

import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export const getAreas = async () => {
  const allAreas = await prisma.area.findMany();
  if (!allAreas?.length) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../taiwan_districts.json'), 'utf-8'));
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
  }
  return allAreas;
};
