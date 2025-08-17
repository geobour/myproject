import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            // Always allow adding because each item has a unique `id`
            state.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            // Remove by `id`
            return state.filter(item => item.id !== action.payload.id);
        },
        clearWishlist: () => [],
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
