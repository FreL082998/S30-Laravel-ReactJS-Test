import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../modules/users/redux/users';

export const store = configureStore({
  reducer: {
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
