import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../redux/search';
import authSlice from '../redux/auth';
import userSlice from '../redux/user';

const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;