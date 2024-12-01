'use client';

import { useEffect } from 'react';
import useMap from './useMap';
import { CafeData } from '@/constants/types';

const Map = ({ cafes }: { cafes: CafeData[] }) => {
  const { mapRef, setCafes } = useMap();

  useEffect(() => {
    const locations = cafes.map((cafe) => ({
      lat: cafe.address.latitude,
      lng: cafe.address.longitude,
      info: cafe,
    }));

    setCafes(locations);
  }, [cafes]);

  return <div id="map" ref={mapRef} />;
};

export default Map;
