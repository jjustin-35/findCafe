'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation, clearSearchStates } from '@/redux/search';
import SearchBar from '@/components/SearchBar';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';

const Cafe = () => {
  const { currentLocation, cafes, status, isSearching } = useAppSelector((state) => state.search);
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
    <>
      <SearchBar />
      <Map cafes={cafes} isSearching={isSearching} />
      <CafeList cafes={cafes} status={status} />
    </>
  );
};

export default Cafe;
