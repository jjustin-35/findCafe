import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Prisma } from '@prisma/client';
import { getAreas as getAreasApi, getCafes as getCafesApi } from '@/apis/search';
import getCurrentLocationApi from '@/helpers/getCurrentLocation';
import { SearchCafesData, CafeData, Position, Status } from '@/constants/types';
import { RootState } from '@/config/configureStore';
import { isEqual } from '@/helpers/object';
// import { searchByText } from '@/apis/map';

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

export const getAreas = createAsyncThunk('cafes/getAreas', async () => {
  const areas = await getAreasApi();
  return areas;
});

export const getCurrentLocation = createAsyncThunk<Position, void, { state: RootState }>(
  'cafes/getCurrentLocation',
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
  'cafes/getCafes',
  async (searchContent: SearchCafesData & { isSearching?: boolean; isCafeDetail?: boolean }, thunkAPI) => {
    try {
      const { isSearching, ...content } = searchContent;
      thunkAPI.dispatch(setIsSearching(isSearching));

      const cafes = await getCafesApi(content);
      const newCafes = cafes.map((cafe) => {
        return {
          ...cafe,
          rating: cafe.rating,
        };
      });

      if (!newCafes?.length) {
        return thunkAPI.rejectWithValue('No cafes found');
      }

      return { cafes: newCafes };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const cafeSlice = createSlice({
  name: 'cafes',
  initialState,
  reducers: {
    setErr: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setIsCafeDetail: (state, action: PayloadAction<boolean>) => {
      state.isCafeDetail = action.payload;
    },
    setCafeDetail: (state, action: PayloadAction<CafeData>) => {
      state.cafeDetail = action.payload;
      state.isCafeDetail = true;
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
  },
});

export const { setErr, setIsSearching, setIsCafeDetail, setCafeDetail, clearSearchStates } = cafeSlice.actions;

export default cafeSlice.reducer;
