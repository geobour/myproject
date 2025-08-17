
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        lat: null,
        lon: null,
        date: null,
    },
    reducers: {
        setFilters: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearFilters: () => ({
            lat: null,
            lon: null,
            date: null,
        }),
    },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
