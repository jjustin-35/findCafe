import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface Profile {
  _id: string;
  address?: string;
  [key: string]: any;
}

interface AuthState {
  token: string;
  profile: Profile | null;
}

const initialState: AuthState = {
  token: '',
  profile: null,
};

const apiUrl = process.env.REACT_APP_API_URL;

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await fetch(`${apiUrl}/auth/check`, {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (!data.isAuth) {
        Cookies.remove('token');
      }
    } catch (error) {
      Cookies.remove('token');
    }
  }

  return { token: token, profile: null };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    });
  },
});

export const { setToken, setProfile } = authSlice.actions;

export default authSlice.reducer;
