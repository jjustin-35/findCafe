import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface Profile {
  _id: string;
  address?: string;
  [key: string]: any;
}

interface AuthState {
  isAuth: boolean;
  profile: Profile | null;
}

const initialState: AuthState = {
  isAuth: false,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
  },
});

export const { setIsAuth, setProfile } = authSlice.actions;

export default authSlice.reducer;
