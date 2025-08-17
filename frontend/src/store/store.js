import { configureStore, combineReducers } from '@reduxjs/toolkit';
import wishlistReducer from './wishList/wishListSlice.js';
import filtersReducer from './filters/filters.js';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    wishlist: wishlistReducer,
    filters: filtersReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['wishlist', 'filters'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
