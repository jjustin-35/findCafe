'use client';

import { use } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchCafes, getCurrentLocation } from '@/redux/search';
import { getCafesByApi } from '@/apis/search';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';

const CafeInfo = () => {
  const { currentLocation } = useAppSelector((state) => state.search);
  const cafes = use(getCafesByApi({ position: currentLocation }));

  return (
    <Box>
      <Map cafes={cafes} />
      <CafeList cafes={cafes} />
    </Box>
  );
};

export default CafeInfo;
