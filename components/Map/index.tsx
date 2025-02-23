'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import useMap from './useMap';
import { CafeData } from '@/constants/types';

const Map = ({ cafes, isSearching }: { cafes: CafeData[]; isSearching?: boolean }) => {
  const { map, mapRef, cafeLocations, setCafes } = useMap();

  useEffect(() => {
    const cafeInfos = cafes.map((cafe) => ({
      lat: cafe.latitude,
      lng: cafe.longitude,
      info: cafe,
    }));

    setCafes(cafeInfos);
  }, [cafes]);

  useEffect(() => {
    if (!cafeLocations[0] || !map) return;
    if (!isSearching) return;
    map.setCenter({ ...cafeLocations[0] });
  }, [cafeLocations, isSearching, map]);

  return (
    <Box
      id="map"
      ref={mapRef}
      component="div"
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
