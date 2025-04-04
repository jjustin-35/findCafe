import { Position, SearchCafesData } from '@/constants/types';
import { getLoader } from '@/lib/mapLoader';
import { generateKey, getCache, setCache } from '@/lib/apiCache';
import { defaultPosition } from '@/constants/position';

const loader = getLoader();

const fields = ['id', 'displayName', 'rating', 'photos', 'location', 'formattedAddress'];

// google map api
export const searchByText = async (
  query: SearchCafesData,
  location: Position | null,
): Promise<google.maps.places.Place[] | null> => {
  try {
    const cacheKey = generateKey('searchByText', {
      query,
      location,
    });

    // Check if result exists in cache
    const cachedResult = getCache<google.maps.places.Place[]>(cacheKey);
    if (cachedResult) {
      console.log('Using cached result for:', query.keyword);
      return cachedResult;
    }

    const { Place } = await loader.importLibrary('places');

    const request: google.maps.places.SearchByTextRequest = {
      ...(query.keyword && { textQuery: query.keyword }),
      fields,
      includedType: 'cafe',
      locationBias: location || defaultPosition,
      maxResultCount: 20,
      minRating: query.rating,
      language: 'zh-TW',
      region: 'TW',
    };

    const { places } = await Place.searchByText(request);

    if (!places || places.length === 0) {
      console.log('No places found for query:', query);
      return null;
    }

    // Store result in cache
    setCache(cacheKey, places);

    return places;
  } catch (error) {
    console.error('Error searching place by text:', error);
    return null;
  }
};

export const searchNearby = async (location = defaultPosition) => {
  try {
    // Generate cache key
    const cacheKey = generateKey('searchNearby', {
      lat: location.lat,
      lng: location.lng,
    });

    // Check if result exists in cache
    const cachedResult = getCache<google.maps.places.Place[]>(cacheKey);
    if (cachedResult) {
      console.log('Using cached nearby results for location:', location);
      return cachedResult;
    }

    const { Place } = await loader.importLibrary('places');

    const center = new google.maps.LatLng(location.lat, location.lng);

    const request: google.maps.places.SearchNearbyRequest = {
      fields,
      includedTypes: ['cafe'],
      locationRestriction: {
        center: center,
        radius: 1000,
      },
      rankPreference: google.maps.places.SearchNearbyRankPreference.POPULARITY,
      language: 'zh-TW',
      region: 'TW',
    };

    const result = await Place.searchNearby(request);
    const places = result?.places || [];

    // Store result in cache
    if (places.length > 0) {
      setCache(cacheKey, places);
    }

    return places;
  } catch (error) {
    console.error('Error searching place by nearby:', error);
    return [];
  }
};
