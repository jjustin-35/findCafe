import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Prisma } from '@prisma/client';
import { getAreas as getAreasApi, getCafesData as getCafesDataApi } from '@/apis/search';
import getCurrentLocationApi from '@/helpers/getCurrentLocation';
import { SearchCafesData, CafeData, Position, Status, MapApiCafeData } from '@/constants/types';
import { RootState } from '@/config/configureStore';
import { isEqual } from '@/helpers/object';

interface SearchState {
  status: Status;
  error: string | null;
  areas: Prisma.AreaGetPayload<{ include: { districts: true } }>[];
  currentLocation: Position | null;
  cafes: CafeData[];
  isSearching: boolean;
  isCafeDetail: boolean;
}

const initialState: SearchState = {
  status: Status.IDLE,
  error: null,
  areas: [],
  currentLocation: null,
  cafes: [],
  isSearching: false,
  isCafeDetail: false,
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

export const getCafesData = createAsyncThunk('search/getCafesData', async (data: { cafeData: MapApiCafeData[]; query: SearchCafesData; isSearching?: boolean; isCafeDetail?: boolean }, thunkAPI) => {
  try {
    const { cafeData, query, isCafeDetail, isSearching } = data;
    const cafes = await getCafesDataApi(cafeData, query);

    if (!cafes?.length) {
      return thunkAPI.rejectWithValue('No cafes found');
    }

    return { cafes, isSearching, isCafeDetail };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});

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
    builder.addCase(getCafesData.fulfilled, (state, action) => {
      state.cafes = action.payload.cafes;
      state.isSearching = action.payload.isSearching;
      state.isCafeDetail = action.payload.isCafeDetail;
      state.status = Status.FULFILLED;
    });
    builder.addCase(getCafesData.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(getCafesData.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
      state.status = Status.FULFILLED;
    });
  },
});

export const { setErr, setIsSearching, clearSearchStates } = searchSlice.actions;

export default searchSlice.reducer;
