'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation } from '@/redux/search';
import Map from '@/components/Map';
import CafeDetail from '@/components/CafeDetail';

const CafeInfo = ({ cafeName }: { cafeName: string }) => {
  const { currentLocation, cafes, status } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
      return;
    }
  }, [currentLocation]);

  useEffect(() => {
    dispatch(getCafes({ keyword: cafeName }));
  }, [cafeName]);

  return (
    <>
      <Map cafes={cafes} isSearching />
      <CafeDetail cafe={cafes?.[0]} status={status} />
    </>
  );
};

export default CafeInfo;
