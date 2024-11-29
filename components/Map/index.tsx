import { useEffect, useRef } from 'react';
import useMap from './useMap';
import { CafeData, Location } from '@/constants/types';

const Map = ({ cafes, currentLocation }: { cafes: CafeData[]; currentLocation: Location }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { setCafes, setCurrentLocation } = useMap(mapRef);

  useEffect(() => {
    const locations = cafes.map((cafe) => ({
      lat: cafe.address.latitude,
      lng: cafe.address.longitude,
      info: cafe,
    }));

    setCafes(locations);
    setCurrentLocation(currentLocation);
  }, [cafes, currentLocation]);

  return <div id="map" ref={mapRef} />;
};

export default Map;
