'use client';

import { useEffect, use } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation } from '@/redux/search';
import Map from '@/components/Map';
import CafeDetail from '@/components/CafeDetail';

const Cafe = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name: encodedName } = use(params);
  const name = decodeURIComponent(encodedName);
  const { currentLocation, cafes, status } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
      return;
    }
  }, [currentLocation]);

  useEffect(() => {
    dispatch(getCafes({ keyword: name }));
  }, [name]);

  return (
    <>
      <Map cafes={cafes} isSearching />
      <CafeDetail cafe={cafes?.[0]} status={status} />
    </>
  );
};

export default Cafe;
