import { configureStore } from '@reduxjs/toolkit';
import search from '../redux/search';
import auth from '../redux/auth';
import user from '../redux/user';
import cafe from '@/redux/cafe';

const store = configureStore({
  reducer: {
    search,
    auth,
    user,
    cafe,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;