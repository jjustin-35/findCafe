import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { Position } from '@/constants/types';
import { theme } from '@/style/theme';
import { isEqual } from '@/helpers/object';
import { getCafes, setIsSearching } from '@/redux/search';

const loader = new Loader({
  apiKey: process.env.GCP_MAP_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const useMap = () => {
  const { currentLocation } = useAppSelector((state) => state.search);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [curLocationTemp, setCurLocationTemp] = useState<Position | null>(null);
  const [cafeLocations, setCafeLocations] = useState<Position[]>([]);
  const [cafeMarkers, setCafeMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 15,
    mapId: process.env.GCP_MAP_ID,
    disableDefaultUI: true,
    gestureHandling: 'cooperative',
  };

  // init map
  useEffect(() => {
    (async () => {
      try {
        const { Map } = await loader.importLibrary('maps');

        if (!mapRef.current) return;

        const googleMap = new Map(mapRef.current, mapOptions);
        setMap(googleMap);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [mapRef.current]);

  // set current location
  useEffect(() => {
    (async () => {
      if (!map) return;
      const isLocationChanged = !isEqual(curLocationTemp, currentLocation);

      if (isLocationChanged) {
        map.panTo(currentLocation);
        await addMarkers({ map, locations: [currentLocation] });
        setCurLocationTemp(currentLocation);
      }
    })();
  }, [map, currentLocation]);

  // set cafe markers
  useEffect(() => {
    (async () => {
      if (!map) return;
      const markers = await addMarkers({ map, locations: cafeLocations, isCafe: true });
      setCafeMarkers(markers);
    })();
  }, [map, cafeLocations]);

  const addMarkers = async ({
    map,
    locations,
    isCafe = false,
  }: {
    map: google.maps.Map;
    locations: Position[];
    isCafe?: boolean;
  }) => {
    const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');

    const markers = locations.map((location) => {
      const { info, ...position } = location;
      const markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
        map,
        position,
      };

      if (isCafe) {
        const pin = document.createElement('img');
        pin.src = '/images/coffee-filled.svg';
        pin.width = pin.height = 12;
        const pinSvg = new PinElement({
          glyph: pin,
          background: theme.palette.primary.main,
          borderColor: '#ffffff',
          scale: 0.9,
        });

        markerOptions.content = pinSvg.element;
      }

      const marker = new AdvancedMarkerElement(markerOptions);

      if (isCafe) {
        marker.addListener('click', () => {
          map.panTo(position);
          dispatch(getCafes({ keyword: info?.name }));
          dispatch(setIsSearching(true));
        });
      }

      return marker;
    });

    return markers;
  };

  const setCafes = (locations: Position[]) => {
    setCafeLocations(locations);
  };

  return {
    mapRef,
    map,
    cafeMarkers,
    cafeLocations,
    setCafes,
  };
};

export default useMap;
