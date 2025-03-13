import { configureStore } from '@reduxjs/toolkit';
import cafes from '../redux/cafes';
import auth from '../redux/auth';

const store = configureStore({
  reducer: {
    cafes,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;