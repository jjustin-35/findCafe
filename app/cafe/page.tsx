'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation, clearSearchStates } from '@/redux/search';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';
import SearchBar from '@/components/SearchBar';

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
      <Box py={2} position="sticky" top={0} bgcolor="inherit" zIndex={1}>
        <SearchBar hasButton />
      </Box>
      <Map cafes={cafes} isSearching={isSearching} />
      <CafeList cafes={cafes} status={status} />
    </>
  );
};

export default Cafe;
