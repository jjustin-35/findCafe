import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '../src/redux/GlobalProvider';
import authSlice from '../src/redux/auth';

const store = configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;