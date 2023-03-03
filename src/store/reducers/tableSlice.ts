import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
	currentPage: number;
}

const initialState: TableState = {
	currentPage: 1
};

export const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		}
	}
});

export const { setCurrentPage } = tableSlice.actions;

export default tableSlice.reducer;
