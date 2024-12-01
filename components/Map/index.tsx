'use client';

import { useEffect, useRef } from 'react';
import useMap from './useMap';
import { CafeData, Position } from '@/constants/types';

const Map = ({ cafes, currentLocation }: { cafes: CafeData[]; currentLocation: Position }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setCafes } = useMap(mapRef);

  useEffect(() => {
    const locations = cafes.map((cafe) => ({
      lat: cafe.address.latitude,
      lng: cafe.address.longitude,
      info: cafe,
    }));

    setCafes(locations);
  }, [cafes, currentLocation]);

  return <div id="map" ref={mapRef} />;
};

export default Map;
