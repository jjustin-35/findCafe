'use client';

import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchCafes, getCurrentLocation } from '@/redux/search';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';

const CafeInfo = () => {
  const { cafes, currentLocation } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
    }
    if (cafes.length === 0) {
      dispatch(searchCafes({ position: currentLocation }));
    }
  }, [cafes, currentLocation]);

  return (
    <Stack direction={{ mobile: 'column', laptop: 'row' }}>
      <CafeList cafes={cafes} />
      <Map cafes={cafes} />
    </Stack>
  );
};

export default CafeInfo;
