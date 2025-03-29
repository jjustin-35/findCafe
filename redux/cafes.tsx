import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Prisma } from '@prisma/client';
import { getAreas as getAreasApi, getCafes as getCafesApi } from '@/apis/search';
import getCurrentLocationApi from '@/helpers/getCurrentLocation';
import { SearchCafesData, CafeData, Position, Status } from '@/constants/types';
import { RootState } from '@/config/configureStore';
import { isEqual } from '@/helpers/object';
import { searchByText } from '@/apis/map';

interface SearchState {
  status: Status;
  error: string | null;
  areas: Prisma.AreaGetPayload<{ include: { districts: true } }>[];
  currentLocation: Position | null;
  cafes: CafeData[];
  isSearching: boolean;
  isCafeDetail: boolean;
  cafeDetail: CafeData | null;
  detailStatus: Status;
}

const initialState: SearchState = {
  status: Status.IDLE,
  error: null,
  areas: [],
  currentLocation: null,
  cafes: [],
  isSearching: false,
  isCafeDetail: false,
  cafeDetail: null,
  detailStatus: Status.IDLE,
};

export const getAreas = createAsyncThunk('search/getAreas', async () => {
  const areas = await getAreasApi();
  return areas;
});

export const getCurrentLocation = createAsyncThunk<Position, void, { state: RootState }>(
  'search/getCurrentLocation',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentLocation: oriLocation } = getState().cafes;
      const location = await getCurrentLocationApi();
      if (isEqual(location, oriLocation)) {
        return oriLocation;
      }

      return location;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  },
);

export const getCafes = createAsyncThunk(
  'search/getCafes',
  async (searchContent: SearchCafesData & { isSearching?: boolean; isCafeDetail?: boolean }, thunkAPI) => {
    try {
      const { isSearching, ...content } = searchContent;
      const cafes = await getCafesApi(content);

      if (!cafes?.length) {
        return thunkAPI.rejectWithValue('No cafes found');
      }

      return { cafes, isSearching };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCafeDetails = createAsyncThunk<CafeData, { cafe: CafeData }, { state: RootState }>(
  'search/getCafeDetails',
  async ({ cafe }, { rejectWithValue }) => {
    try {
      // Fetch rating and images from Google Place API
      const result = await searchByText({ keyword: cafe.name }, { lat: cafe.latitude, lng: cafe.longitude });

      const images =
        result?.photos?.map((photo, idx) => ({
          src: photo.getURI(),
          alt: `img-${cafe.name}-${idx}`,
        })) || [];
      const rating = result?.rating || null;

      return { ...cafe, images, rating };
    } catch (error) {
      console.error('Error fetching cafe details:', error);
      return rejectWithValue(error);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setErr: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    clearSearchStates: (state) => {
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAreas.fulfilled, (state, action) => {
      state.areas = action.payload;
    });
    builder.addCase(getCurrentLocation.fulfilled, (state, action) => {
      state.currentLocation = action.payload;
    });
    builder.addCase(getCurrentLocation.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
    });
    builder.addCase(getCafes.fulfilled, (state, action) => {
      state.cafes = action.payload.cafes;
      state.isSearching = action.payload.isSearching;
      state.isCafeDetail = false;
      state.status = Status.FULFILLED;
    });
    builder.addCase(getCafes.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(getCafes.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
      state.status = Status.FULFILLED;
    });
    builder.addCase(getCafeDetails.pending, (state) => {
      state.detailStatus = Status.PENDING;
    });
    builder.addCase(getCafeDetails.fulfilled, (state, action) => {
      state.cafeDetail = action.payload;
      state.isCafeDetail = true;
      state.detailStatus = Status.FULFILLED;
    });
    builder.addCase(getCafeDetails.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
      state.detailStatus = Status.FULFILLED;
    });
  },
});

export const { setErr, setIsSearching, clearSearchStates } = searchSlice.actions;

export default searchSlice.reducer;
