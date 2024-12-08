'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import useMap from './useMap';
import { CafeData } from '@/constants/types';

const Map = ({ cafes, width, height }: { cafes: CafeData[]; width?: string; height?: string }) => {
  const { mapRef, setCafes } = useMap();

  useEffect(() => {
    const locations = cafes.map((cafe) => ({
      lat: cafe.address.latitude,
      lng: cafe.address.longitude,
      info: cafe,
    }));

    setCafes(locations);
  }, [cafes]);

  return <Box id="map" ref={mapRef} sx={{ width, height }} />;
};

export default Map;
