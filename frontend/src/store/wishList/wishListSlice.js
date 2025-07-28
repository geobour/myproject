
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            const exists = state.find(item => item.time === action.payload.time);
            if (!exists) state.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            return state.filter(item => item.time !== action.payload.time);
        },
        clearWishlist: () => [],
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
