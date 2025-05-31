import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Prisma } from '@prisma/client';
import { getAreas as getAreasApi, getCafes as getCafesApi } from '@/apis/cafes';
import getCurrentLocationApi from '@/helpers/getCurrentLocation';
import { SearchCafesData, CafeData, Position, Status } from '@/constants/types';
import { RootState } from '@/config/configureStore';
import { isEqual } from '@/helpers/object';
import { getCafeById, searchByText, searchNearby } from '@/apis/map';
import { isWithinDistance } from '@/helpers/comparePosition';
import { generateAISearchData } from '@/apis/ai';
import { getTags } from '@/helpers/getTags';
import { transformToCafeData } from '@/helpers/transform';

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
  aiStatus: Status;
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
  aiStatus: Status.IDLE,
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
      const { isSearching, isCafeDetail, ...content } = searchContent;

      thunkAPI.dispatch(setIsSearching(isSearching));
      let resp: google.maps.places.Place[] = [];

      // use AI to generate search keyword
      let searchParams: SearchCafesData = { ...content };
      let aiSearchData: SearchCafesData | null = null;
      if (isSearching) {
        thunkAPI.dispatch(setIsCafeDetail(false));
        thunkAPI.dispatch(setAIStatus(Status.PENDING));
        aiSearchData = await generateAISearchData({
          ...content,
        });

        if (aiSearchData) {
          searchParams = { ...searchParams, ...aiSearchData };
        }
      }

      const { keyword, rating, position } = searchParams;
      if (isSearching && keyword) {
        resp = await searchByText({
          keyword,
          rating,
          position,
        });
      } else {
        resp = await searchNearby(position);
      }

      if (!resp?.length) {
        console.warn('no cafe found');
        return thunkAPI.rejectWithValue('no_cafe_found');
      }

      const cafes = resp?.map((cafe) => {
        return transformToCafeData(cafe);
      });

      const cafesInfo = await getCafesApi();
      const newCafes = cafes.reduce<CafeData[]>((acc, cafe) => {
        const cafeInfo = cafesInfo.find((info) => {
          return isWithinDistance(
            { lat: cafe.latitude, lng: cafe.longitude },
            { lat: info.latitude, lng: info.longitude },
            10,
          );
        });

        const newCafe = {
          ...(!!cafeInfo && cafeInfo),
          ...cafe,
          info: cafeInfo,
        };

        // filter by tags
        if (searchParams?.tags?.length) {
          const cafeTags = getTags(newCafe);
          const isMatched = searchParams.tags.every((tag) => cafeTags.includes(tag));
          if (!isMatched) {
            return acc;
          }
        }

        return [...acc, newCafe];
      }, []);

      if (!newCafes?.length) {
        console.warn('no cafe found');
        return thunkAPI.rejectWithValue('no_cafe_found');
      }

      const sortedCafes = newCafes.sort((a, b) => b.rating - a.rating);

      return { cafes: sortedCafes };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCafeDetail = createAsyncThunk('cafes/getCafeDetail', async (cafe: CafeData, thunkAPI) => {
  try {
    const { id } = cafe;
    const cafeDetail = await getCafeById(id);
    console.log('cafeDetail', cafeDetail);
    if (!cafeDetail) {
      return thunkAPI.rejectWithValue('cafe_detail_not_found');
    }

    const transformedCafeDetail = transformToCafeData(cafeDetail);
    const newCafeDetail: CafeData = {
      ...cafe,
      ...transformedCafeDetail,
    };

    return newCafeDetail;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});

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
      state = { ...initialState, cafeDetail: state.cafeDetail, isCafeDetail: state.isCafeDetail };
    },
    setAIStatus: (state, action: PayloadAction<Status>) => {
      state.aiStatus = action.payload;
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
      state.status = Status.FULFILLED;
    });
    builder.addCase(getCafes.pending, (state) => {
      state.status = Status.PENDING;
    });
    builder.addCase(getCafes.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
      state.status = Status.FULFILLED;
      if (action.payload === 'no_cafe_found') {
        state.cafes = [];
      }
    });

    builder.addCase(getCafeDetail.fulfilled, (state, action) => {
      state.cafeDetail = action.payload;
      state.isCafeDetail = true;
      state.detailStatus = Status.FULFILLED;
    });
    builder.addCase(getCafeDetail.pending, (state) => {
      state.detailStatus = Status.PENDING;
    });
    builder.addCase(getCafeDetail.rejected, (state, action) => {
      state.error = action.error.message || 'An error occurred';
      state.detailStatus = Status.FULFILLED;
    });
  },
});

export const { setErr, setIsSearching, setIsCafeDetail, setCafeDetail, clearSearchStates, setAIStatus } =
  cafeSlice.actions;

export default cafeSlice.reducer;
