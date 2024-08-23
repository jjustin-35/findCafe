import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from '../../helpers/object';

interface Area {
  name: string;
  districts: { name: string }[];
}

interface SearchState {
  address?: string;
  [key: string]: string | undefined;
}

interface Profile {
  _id: string;
  address?: string;
  [key: string]: any;
}

interface GlobalState {
  error: string | null;
  areas: Area[];
  search: SearchState;
  profile: Profile | null;
  newInfo: Partial<Profile>;
}

const initialState: GlobalState = {
  error: null,
  areas: [],
  search: {},
  profile: null,
  newInfo: {},
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

export const updateUserInfo = createAsyncThunk('global/updateUserInfo', async (_, { getState }) => {
  const state = (getState() as any).global;
  if (!isEmpty(state.newInfo)) {
    const res = await fetch(`${apiUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.token ? state.token : '',
      },
      body: JSON.stringify({ _id: state.profile?._id, data: state.newInfo }),
    });
    return await res.json();
  }
});

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setErr: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearch: (state, action: PayloadAction<SearchState>) => {
      state.search = action.payload;
    },
    setNewInfo: (state, action: PayloadAction<Partial<Profile>>) => {
      state.newInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.fulfilled, (state, action) => {
        state.areas = action.payload;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        // 處理更新用戶資訊的回應
      });
  },
});

export const { setErr, setSearch, setNewInfo } = globalSlice.actions;

export default globalSlice.reducer;