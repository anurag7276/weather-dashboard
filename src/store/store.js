
import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './weatherApi';
import settingsReducer from './settingsSlice';
import favoritesReducer from './favoritesSlice';
import authReducer from './authSlice'; 
import { favoritesMiddleware } from './favoritesMiddleware'; 

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    settings: settingsReducer,
    favorites: favoritesReducer,
    auth: authReducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware).concat(favoritesMiddleware), 
});