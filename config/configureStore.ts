import { configureStore } from '@reduxjs/toolkit';
import search from '../redux/search';
import auth from '../redux/auth';
import cafe from '@/redux/cafe';

const store = configureStore({
  reducer: {
    search,
    auth,
    cafe,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;