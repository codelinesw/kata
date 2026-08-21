import { configureStore } from '@reduxjs/toolkit';
import savingsReducer from '../../presentation/storage/savingsSlice';

export const store = configureStore({
  reducer: {
    savings: savingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;