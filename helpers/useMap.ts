import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { CafeData, Position } from '@/constants/types';
import { theme } from '@/style/theme';
import { isEqual } from '@/helpers/object';
import { setCafeDetail } from '@/redux/cafes';
import { getLoader } from '@/lib/mapLoader';

const loader = getLoader();

const useMap = () => {
  const { currentLocation, isSearching, isCafeDetail, cafeDetail } = useAppSelector((state) => state.cafes);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [curLocationTemp, setCurLocationTemp] = useState<Position | null>(null);
  const [cafesList, setCafesList] = useState<CafeData[]>([]);
  const [cafeListOri, setCafeListOri] = useState<CafeData[]>([]);
  const [cafeMarkers, setCafeMarkers] = useState<
    {
      cafeId: string;
      marker: google.maps.marker.AdvancedMarkerElement;
      onFocus: (info: CafeData) => void;
    }[]
  >([]);
  const [focusedCafeAndInfo, setFocusedCafeAndInfo] = useState<{
    cafe: CafeData;
    infoWindow: google.maps.InfoWindow;
  } | null>(null);
  const [prevFocusedCafeAndInfo, setPrevFocusedCafeAndInfo] = useState<{
    cafe: CafeData;
    infoWindow: google.maps.InfoWindow;
  } | null>(null);
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
  }, [map, cafesList, isCafeDetail]);

  // // handle cafe focus
  useEffect(() => {
    if (!map) return;
    prevFocusedCafeAndInfo?.infoWindow?.close();
    setPrevFocusedCafeAndInfo(focusedCafeAndInfo);
  }, [map, focusedCafeAndInfo]);

  const handleCafeFocus = 
    (cafe: CafeData, marker: google.maps.marker.AdvancedMarkerElement) => {
      if (!map) return;

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="font-size: 14px; text-align: center">${cafe.name}</div>`,
      });
      map.panTo({
        lat: cafe.latitude,
        lng: cafe.longitude,
      });
      infoWindow.open({
        map,
        anchor: marker,
      });

      setFocusedCafeAndInfo({ cafe, infoWindow });
    };

  const handleBlurAll = () => {
    if (!map) return;
    focusedCafeAndInfo?.infoWindow?.close();
    setFocusedCafeAndInfo(null);
  };

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
      const onFocus = (info: CafeData) => {
        handleCafeFocus(info, marker);
      };

      if (isCafe) {
        marker.addListener('click', () => {
          onFocus(info);
          dispatch(setCafeDetail(info));
        });
      }

      return { cafeId: info?.id, marker, onFocus };
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
    handleBlurAll,
    setCafes,
  };
};

export default useMap;
