import { CafeData, SearchCafesData } from '@/constants/types';
import { getTags } from './getTags';

const filterCafes = (cafes: CafeData[], search: SearchCafesData) => {
  const { areaKey, district, location, position, rating, tags, keyword } = search;
  let filteredCafes = cafes;

  const distance = 0.01;
  const scope = position && {
    minLat: position.lat - distance,
    maxLat: position.lat + distance,
    minLng: position.lng - distance,
    maxLng: position.lng + distance,
  };

  // Filter by area/district if specified
  if (areaKey || district) {
    filteredCafes = filteredCafes?.filter((cafe) => {
      if (areaKey && !cafe.city.includes(areaKey)) return false;
      if (district && !cafe.address.includes(district)) return false;
      return true;
    });
  }

  // Filter by rating if specified
  if (rating) {
    filteredCafes = filteredCafes.filter((cafe) => {
      return cafe.rating >= rating;
    });
  }

  // Filter by location if specified
  if (location) {
    filteredCafes = filteredCafes.filter((cafe) => cafe.address.includes(location) || cafe.city.includes(location));
  }

  // Filter by position if specified
  if (scope) {
    filteredCafes = filteredCafes.filter((cafe) => {
      const lat = cafe.latitude;
      const lng = cafe.longitude;
      return lat >= scope.minLat && lat <= scope.maxLat && lng >= scope.minLng && lng <= scope.maxLng;
    });
  }

  // Filter by keyword if specified
  if (keyword) {
    const searchKeyword = keyword.toLowerCase();
    filteredCafes = filteredCafes.filter((cafe) => {
      return cafe.name.toLowerCase().includes(searchKeyword) || cafe.address.toLowerCase().includes(searchKeyword);
    });
  }

  // Filter by tags if specified
  if (tags && tags.length > 0) {
    filteredCafes = filteredCafes.filter((cafe) => {
      const cafeTags = getTags(cafe);
      return tags.every((tag) => cafeTags.includes(tag));
    });
  }

  return filteredCafes;
};

export default filterCafes;
