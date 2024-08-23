import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from '../helpers/object';

interface Profile {
  _id: string;
  address?: string;
  [key: string]: any;
}

interface UserState {
  profile: Profile | null;
  newInfo: Partial<Profile>;
}

const initialState: UserState = {
  profile: null,
  newInfo: {},
};

const apiUrl = process.env.REACT_APP_API_URL;

export const updateUserInfo = createAsyncThunk('user/updateUserInfo', async (_, { getState }) => {
  const state = (getState() as any).user;
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    setNewInfo: (state, action: PayloadAction<Partial<Profile>>) => {
      state.newInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      // 處理更新用戶資訊的回應
    });
  },
});

export const { setProfile, setNewInfo } = userSlice.actions;

export default userSlice.reducer;
