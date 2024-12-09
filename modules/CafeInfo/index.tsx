'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchCafes, getCurrentLocation } from '@/redux/search';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';
import SearchInput from '../../components/SearchBar';

const CafeInfo = () => {
  const { cafes, currentLocation } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
    }
    if (cafes.length === 0 && currentLocation) {
      dispatch(searchCafes({ position: currentLocation }));
    }
  }, [cafes, currentLocation]);

  const onSubmit = ({ keyword }: { keyword: string }) => {
    dispatch(searchCafes({ keyword }));
  };

  return (
    <Box>
      <Map cafes={cafes} />
      <CafeList cafes={cafes} />
    </Box>
  );
};

export default CafeInfo;
