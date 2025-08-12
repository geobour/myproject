import { configureStore, combineReducers } from '@reduxjs/toolkit';
import wishlistReducer from './wishList/wishListSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    wishlist: wishlistReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['wishlist'],
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
