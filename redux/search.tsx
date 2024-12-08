import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Prisma } from '@prisma/client';
import { getAreas as getAreasApi, searchCafes as searchCafesApi } from '@/apis/search';
import getCurrentLocationApi from '@/helpers/getCurrentLocation';
import { SearchCafesData, CafeData, Position } from '@/constants/types';
import { RootState } from '@/config/configureStore';
import { isEqual } from '@/helpers/object';

interface SearchState {
  error: string | null;
  areas: Prisma.AreaGetPayload<{ include: { districts: true } }>[];
  currentLocation: Position | null;
  cafes: CafeData[];
}

const initialState: SearchState = {
  error: null,
  areas: [],
  currentLocation: null,
  cafes: [],
};

export const getAreas = createAsyncThunk('search/getAreas', async () => {
  const areas = await getAreasApi();
  return areas;
});

export const getCurrentLocation = createAsyncThunk<Position, void, { state: RootState }>(
  'search/getCurrentLocation',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentLocation: oriLocation } = getState().search;
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

export const searchCafes = createAsyncThunk('search/searchCafes', async (searchContent: SearchCafesData, thunkAPI) => {
  try {
    const cafes = await searchCafesApi(searchContent);

    if (!cafes?.length) {
      return thunkAPI.rejectWithValue('No cafes found');
    }

    return cafes;
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
    builder.addCase(searchCafes.fulfilled, (state, action) => {
      state.cafes = action.payload;
    });
    builder.addCase(searchCafes.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
    });
  },
});

export const { setErr } = searchSlice.actions;

export default searchSlice.reducer;
