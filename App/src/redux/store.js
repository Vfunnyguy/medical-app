import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from "./slice/authSlice";
import authReducer from './slice/authSlice'
export const store= configureStore({
    reducer:{
        auth:authReducer,
    }
})