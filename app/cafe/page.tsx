'use client';

import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation, clearSearchStates, getCafeDetails } from '@/redux/cafes';
import useMap from '@/helpers/useMap';
import SearchBar from '@/components/SearchBar';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';
import { CafeData } from '@/constants/types';

const Cafe = () => {
  const { currentLocation, cafes, status, isCafeDetail, detailStatus } = useAppSelector((state) => state.cafes);
  const dispatch = useAppDispatch();
  const { mapRef, cafesList, setCafes } = useMap();

  const cafeList = useMemo(() => cafesList.map(cafe => cafe), [cafesList]);

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

  // Fetch cafe details when in detail view
  useEffect(() => {
    if (isCafeDetail && cafes.length > 0) {
      dispatch(getCafeDetails());
    }
  }, [cafes, isCafeDetail]);

  // Update map with cafes data
  useEffect(() => {
    setCafes(cafes);
  }, [cafes, setCafes]);

  return (
    <>
      <SearchBar />
      <Map mapRef={mapRef} />
      <CafeList cafes={cafeList} status={isCafeDetail ? detailStatus : status} />
    </>
  );
};

export default Cafe;
