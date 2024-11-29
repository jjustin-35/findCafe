import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useState } from 'react';
import { Location } from '@/constants/types';
import { theme } from '@/style/theme';

const loader = new Loader({
  apiKey: process.env.GCP_MAP_KEY,
  version: 'weekly',
  libraries: ['places'],
});

const addMarkers = async ({
  map,
  locations,
  isCafe = false,
}: {
  map: google.maps.Map;
  locations: Location[];
  isCafe?: boolean;
}) => {
  const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');
  const { InfoWindow } = await loader.importLibrary('maps');

  return locations.map((location) => {
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
        scale: 0.8,
      });

      markerOptions.content = pinSvg.element;
    }

    const marker = new AdvancedMarkerElement(markerOptions);

    if (isCafe) {
      const content = `
        <div>
          <h5 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${info?.name}</h5>
          <p style="font-size: 14px; margin-bottom: 4px;">${info?.address}</p>
          <p style="font-size: 14px; margin-bottom: 4px;">${info?.phone}</p>
        </div>
      `;
      const infoWindow = new InfoWindow({
        content,
      });
      const openInfoWindow = () => infoWindow.open({ map, anchor: marker });
      marker.addListener('click', openInfoWindow);
    }

    return marker;
  });
};

const useMap = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [curLocation, setCurLocation] = useState<Location | null>(null);
  const [curLocationTemp, setCurLocationTemp] = useState<Location | null>(null);
  const [cafeLocations, setCafeLocations] = useState<Location[]>([]);
  const [cafeMarkers, setCafeMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 15,
    mapId: process.env.GCP_MAP_ID,
    disableDefaultUI: true,
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
  }, []);

  // set current location
  useEffect(() => {
    (async () => {
      if (!map) return;
      const isLocationChanged =
        curLocationTemp &&
        Object.keys(curLocationTemp).some(
          (key) => curLocationTemp[key as keyof Location] !== curLocation?.[key as keyof Location],
        );

      if (isLocationChanged) {
        map.setCenter(curLocationTemp);
        await addMarkers({ map, locations: [curLocationTemp] });
        setCurLocation(curLocationTemp);
      }
    })();
  }, [map, curLocationTemp]);

  // set cafe markers
  useEffect(() => {
    (async () => {
      if (!map) return;
      const markers = await addMarkers({ map, locations: cafeLocations, isCafe: true });
      setCafeMarkers(markers);
    })();
  }, [map, cafeLocations]);

  const setCurrentLocation = (location: Location) => {
    setCurLocationTemp(location);
  };

  const setCafes = (locations: Location[]) => {
    setCafeLocations(locations);
  };

  return {
    map,
    cafeMarkers,
    setCafes,
    setCurrentLocation,
  };
};

export default useMap;
