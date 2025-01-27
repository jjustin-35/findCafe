'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation, clearSearchStates } from '@/redux/search';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';

const CafeInfo = () => {
  const { currentLocation, cafes, status } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
      return;
    }

    dispatch(getCafes({ position: currentLocation }));
  }, [currentLocation]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchStates());
    };
  }, []);

  return (
    <div>
      <Map cafes={cafes} />
      <CafeList cafes={cafes} status={status} />
    </div>
  );
};

export default CafeInfo;
