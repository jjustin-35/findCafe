import { Position, SearchCafesData } from "@/constants/types";
import { getLoader } from "@/lib/mapLoader";

const loader = getLoader();

// google map api
export const searchByText = async (query: SearchCafesData, currentLocation: Position | null): Promise<google.maps.places.Place | null> => {
    try {
        const { Place } = await loader.importLibrary('places');

        const request = {
            textQuery: query.keyword,
            fields: ['id', 'displayName', 'formattedAddress', 'location', 'rating', 'photos'],
            includedType: 'cafe',
            locationBias: currentLocation || undefined,
            maxResultCount: 20,
            minRating: query.rank,
            language: 'zh-TW',
            region: 'TW',
        };

        const { places } = await Place.searchByText(request);

        if (!places || places.length === 0) {
            console.log('No places found for query:', query);
            return null;
        }

        console.log('Found place:', places[0].displayName, 'with ID:', places[0].id);
        return places[0] || null;

    } catch (error) {
        console.error('Error searching place by text:', error);
        return null;
    }
};

export const searchNearby = async (currentLocation: Position | null) => {
    try {
        const { Place } = await loader.importLibrary('places');

        const center = new google.maps.LatLng(currentLocation?.lat, currentLocation?.lng);

        const request: google.maps.places.SearchNearbyRequest = {
            fields: ['id', 'rating', 'photos'],
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

        return result?.places || [];
    } catch (error) {
        console.error('Error searching place by text:', error);
        return [];
    }
}