import { defaultPosition } from '@/constants/position';

const getCurrentLocation = async () => {
  try {
    const location = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    if (!location) {
      return defaultPosition;
    }

    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  } catch (error) {
    console.error(error);
    return defaultPosition;
  }
};

export default getCurrentLocation;
