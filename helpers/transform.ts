import { PATHS } from '@/constants/paths';

export const transformToCafeData = (place: google.maps.places.Place) => {
  return {
    id: place.id,
    name: place.displayName,
    latitude: place.location.lat(),
    longitude: place.location.lng(),
    rating: place.rating,
    mapLink: PATHS.GOOGLE_MAP_URL + place.id,
    address: place.formattedAddress,
    images:
      place.photos?.map((photo, idx) => ({
        src: photo.getURI(),
        alt: `${place.displayName}-${idx + 1}`,
      })) || [],
  };
};
