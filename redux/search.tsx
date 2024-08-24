import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Area {
  name: string;
  districts: { name: string }[];
}

interface SearchContent {
  address?: {
    country?: string;
    districts?: string;
  };
}

interface SearchState {
  error: string | null;
  areas: Area[];
  search: SearchContent;
}

const initialState: SearchState = {
  error: null,
  areas: [],
  search: {},
};

const apiUrl = process.env.REACT_APP_API_URL;

export const getAreas = createAsyncThunk('global/getAreas', async () => {
  const response = await fetch(`${apiUrl}/data/address`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const areasData: Area[] = await response.json();
  return areasData;
});

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setErr: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearch: (state, action: PayloadAction<SearchContent>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAreas.fulfilled, (state, action) => {
      state.areas = action.payload;
    });
  },
});

export const { setErr, setSearch } = globalSlice.actions;

export default globalSlice.reducer;