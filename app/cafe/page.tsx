'use client';

import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation, clearSearchStates, getCafeDetails } from '@/redux/cafes';
import useMap from '@/helpers/useMap';
import SearchBar from '@/components/SearchBar';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';
import { Position } from '@/constants/types';

const Cafe = () => {
  const { currentLocation, cafes, cafeDetail, status, isCafeDetail, detailStatus } = useAppSelector(
    (state) => state.cafes,
  );
  const dispatch = useAppDispatch();
  const { mapRef, cafesList, setCafes, map } = useMap();

  const cafeList = useMemo(() => (isCafeDetail ? [cafeDetail] : cafesList), [cafesList, cafeDetail, isCafeDetail]);

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

  // Update map with cafes data
  useEffect(() => {
    setCafes(cafes);
  }, [cafes, setCafes]);

  const moveTo = (position: Position) => {
    map?.panTo(position);
  };

  const moveBack = () => {
    map?.panTo(currentLocation);
  };

  return (
    <>
      <SearchBar hasReturnBtn={isCafeDetail} moveBack={moveBack} />
      <Map mapRef={mapRef} />
      <CafeList cafes={cafeList} status={isCafeDetail ? detailStatus : status} moveTo={moveTo} />
    </>
  );
};

export default Cafe;
