'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getCafes, getCurrentLocation, clearSearchStates } from '@/redux/cafes';
import useMap from '@/helpers/useMap';
import SearchBar from '@/components/SearchBar';
import CafeList from '@/components/CafeList';
import Map from '@/components/Map';
import { Position } from '@/constants/types';

const Cafe = () => {
  const { currentLocation, cafes, status, isCafeDetail } = useAppSelector((state) => state.cafes);
  const dispatch = useAppDispatch();
  const { mapRef, setCafes, searchByText } = useMap();

  useEffect(() => {
    if (!currentLocation) {
      dispatch(getCurrentLocation());
      return;
    }

    dispatch(getCafes({ position: currentLocation }));
  }, [currentLocation]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchStates());
    };
  }, []);

  useEffect(() => {
    (async () => {
      const promises = cafes.map(async (cafe): Promise<Position> => {
        let images: { src: string; alt: string }[] = [];
        let rating: number | null = null;
        if (isCafeDetail) {
          const result = await searchByText(cafe.name);
          images = result?.photos?.map((photo, idx) => ({ src: photo.getURI(), alt: `img-${cafe.name}-${idx}` }));
          rating = result?.rating || 0;
        }
        return ({
          lat: cafe.latitude,
          lng: cafe.longitude,
          info: {
            ...cafe,
            images,
            rating,
          },
        })
      });

      const cafeInfos = await Promise.all(promises);

      setCafes(cafeInfos);
    })();
  }, [cafes, isCafeDetail]);

  return (
    <>
      <SearchBar />
      <Map mapRef={mapRef} />
      <CafeList cafes={cafes} status={status} />
    </>
  );
};

export default Cafe;
