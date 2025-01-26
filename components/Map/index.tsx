'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import useMap from './useMap';
import { CafeData } from '@/constants/types';

const Map = ({ cafes }: { cafes: CafeData[] }) => {
  const { mapRef, setCafes } = useMap();

  useEffect(() => {
    const locations = cafes.map((cafe) => ({
      lat: parseInt(cafe.latitude),
      lng: parseInt(cafe.longitude),
      info: cafe,
    }));

    setCafes(locations);
  }, [cafes]);

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
