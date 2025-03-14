import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { CafeData, Position } from '@/constants/types';
import { theme } from '@/style/theme';
import { isEqual } from '@/helpers/object';
import { getCafes, setIsSearching } from '@/redux/cafes';
import { getLoader } from '@/lib/mapLoader';

const loader = getLoader();

const useMap = () => {
  const { currentLocation, isSearching } = useAppSelector((state) => state.cafes);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [curLocationTemp, setCurLocationTemp] = useState<Position | null>(null);
  const [cafesList, setCafesList] = useState<CafeData[]>([]);
  const [cafeListOri, setCafeListOri] = useState<CafeData[]>([]);
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
      if (isSearching) {
        const position = {
          lat: cafesList[0].latitude,
          lng: cafesList[0].longitude,
        };
        map.panTo(position);
      }
      const newCafes = cafesList.filter((location) => {
        return !cafeListOri.some((oriLocation) => isEqual(oriLocation, location));
      });
      const newLocations = newCafes.map((cafe) => ({
        lat: cafe.latitude,
        lng: cafe.longitude,
        info: cafe,
      }));
      if (newLocations.length > 0) {
        const markers = await addMarkers({ map, locations: newLocations, isCafe: true });
        setCafeMarkers([...cafeMarkers, ...markers]);
        setCafeListOri([...cafeListOri, ...newCafes]);
      }
    })();
  }, [map, cafesList]);

  const addMarkers = async ({
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
          dispatch(getCafes({ keyword: info?.name, isSearching: true, isCafeDetail: true }));
        });
      }

      return marker;
    });

    return markers;
  };

  const setCafes = (cafes: CafeData[]) => {
    setCafesList(cafes);
  };

  return {
    mapRef,
    map,
    cafeMarkers,
    cafesList,
    setCafes,
  };
};

export default useMap;
