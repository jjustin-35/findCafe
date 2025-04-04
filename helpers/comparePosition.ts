import { Position } from '../constants/types';

export const calculateDistance = (a: Position, b: Position): number => {
  const R = 6371000; // Earth's radius in meters
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const deltaLat = ((b.lat - a.lat) * Math.PI) / 180;
  const deltaLng = ((b.lng - a.lng) * Math.PI) / 180;

  const haversine =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return R * c;
};

export const isWithinDistance = (a: Position, b: Position, maxDistance = 50): boolean => {
  const distance = calculateDistance(a, b);
  return distance <= maxDistance;
};
