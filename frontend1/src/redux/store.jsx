import { combineReducers, combineSlices, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE ,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from "redux-persist/Lib/storage"
import { getDefaultConfig } from "tailwind-merge";
// import { Key } from "lucide-react";
// import { version } from "vite";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootreducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:companySlice
});

const persistedReducer = persistReducer(persistConfig, rootreducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;
