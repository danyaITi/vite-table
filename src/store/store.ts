import { configureStore } from '@reduxjs/toolkit';
import tableSlice from './reducers/tableSlice';

export const store = configureStore({
	reducer: {
		tableSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
