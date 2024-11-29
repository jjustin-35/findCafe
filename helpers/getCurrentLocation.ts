const getCurrentLocation = async () => {
  const location = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  };
};

export default getCurrentLocation;
