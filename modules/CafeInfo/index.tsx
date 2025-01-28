'use client';

import { use, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCurrentLocation } from '@/redux/search';
import { CafeData } from '@/constants/types';
import Map from '@/components/Map';
import CafeDetail from '@/components/CafeDetail';

const CafeInfo = ({ getCafes }: { getCafes: Promise<CafeData[]> }) => {
  const { currentLocation } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const cafes = use(getCafes);
  const cafe = cafes?.[0];

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
      return;
    }
  }, [currentLocation]);

  return (
    <>
      <Map cafes={[cafe]} isSearching />
      <CafeDetail cafe={cafe} />
    </>
  );
};

export default CafeInfo;
