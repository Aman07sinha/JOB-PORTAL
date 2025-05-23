import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import jobSlice from "./jobSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from "redux-persist/Lib/storage"
// import { Key } from "lucide-react";
// import { version } from "vite";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootreducer = combineReducers({
    auth:authSlice,
    job:jobSlice
});

const persistedReducer = persistReducer(persistConfig, rootreducer)

const store = configureStore({
    reducer:{
        auth: authSlice,
        job: jobSlice
    }
});
export default store;
