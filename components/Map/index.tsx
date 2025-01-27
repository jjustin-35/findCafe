'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import useMap from './useMap';
import { CafeData } from '@/constants/types';

const Map = ({ cafes }: { cafes: CafeData[] }) => {
  const { map, mapRef, cafeMarkers, setCafes } = useMap();
  const { isSearching } = useAppSelector((state) => state.search);

  useEffect(() => {
    const locations = cafes.map((cafe) => ({
      lat: cafe.latitude,
      lng: cafe.longitude,
      info: cafe,
    }));

    setCafes(locations);
    if (isSearching) {
      map.setCenter({ lat: locations[0].lat, lng: locations[0].lng });
    }
  }, [cafes, isSearching]);

  useEffect(() => {
    if (isSearching) {
      cafeMarkers[0].click();
    }
  }, [cafeMarkers, isSearching]);

  return (
    <Box
      id="map"
      ref={mapRef}
      sx={{
        width: {
          mobile: '100%',
          laptop: 'calc(100% - 400px)',
        },
        height: 'calc(100vh - 64px)',
        ml: {
          mobile: 0,
          laptop: '400px',
        },
      }}
    />
  );
};

export default Map;
