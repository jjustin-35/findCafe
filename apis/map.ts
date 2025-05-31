import { SearchCafesData } from '@/constants/types';
import { getLoader } from '@/lib/mapLoader';
import { generateKey, getCache, setCache } from '@/lib/apiCache';
import { defaultPosition } from '@/constants/position';

const loader = getLoader();

const fields = ['id', 'displayName', 'rating', 'photos', 'location', 'formattedAddress'];

// google map api
export const searchByText = async ({
  keyword,
  rating,
  position,
}: SearchCafesData): Promise<google.maps.places.Place[] | null> => {
  try {
    const cacheKey = generateKey('searchByText', {
      keyword,
      rating,
      position,
    });

    // Check if result exists in cache
    const cachedResult = getCache<google.maps.places.Place[]>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const { Place } = await loader.importLibrary('places');

    const request: google.maps.places.SearchByTextRequest = {
      textQuery: keyword,
      fields,
      includedType: 'coffee_shop',
      minRating: rating,
      language: 'zh-TW',
      region: 'TW',
      ...(position && { locationBias: new google.maps.LatLng(position.lat, position.lng) }),
    };

    const { places } = await Place.searchByText(request);

    if (!places || places.length === 0) {
      console.log('No places found for query:', { keyword, rating, position });
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
      return cachedResult;
    }

    const { Place } = await loader.importLibrary('places');

    const center = new google.maps.LatLng(location.lat, location.lng);

    const request: google.maps.places.SearchNearbyRequest = {
      fields,
      includedTypes: ['cafe', 'coffee_shop'],
      locationRestriction: {
        center: center,
        radius: 1000,
      },
      rankPreference: google.maps.places.SearchNearbyRankPreference.POPULARITY,
      maxResultCount: 20,
      language: 'zh-TW',
      region: 'TW',
    };

    const { places } = await Place.searchNearby(request);

    // Store result in cache
    if (places?.length > 0) {
      setCache(cacheKey, places);
    }

    return places;
  } catch (error) {
    console.error('Error searching place by nearby:', error);
    return [];
  }
};

export const getCafeById = async (id: string) => {
  try {
    const { Place } = await loader.importLibrary('places');
    const place = new Place({
      id,
    });
    await place.fetchFields({
      fields,
    });
    return place;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};
