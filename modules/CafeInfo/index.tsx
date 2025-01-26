'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation } from '@/redux/search';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';

const CafeInfo = () => {
  const { currentLocation, cafes, isLoading } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
      return;
    }

    dispatch(getCafes({ position: currentLocation }));
  }, [currentLocation]);

  return (
    <div>
      <Map cafes={cafes} />
      <CafeList cafes={cafes} isLoading={isLoading} />
    </div>
  );
};

export default CafeInfo;
