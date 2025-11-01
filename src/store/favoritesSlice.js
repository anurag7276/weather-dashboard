import { createSlice } from '@reduxjs/toolkit';


const loadGuestFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites_guest');
    if (serializedFavorites === null) return [];
    return JSON.parse(serializedFavorites);
  } catch (e) {
    return [];
  }
};

const initialState = {
  cities: loadGuestFavorites(), 
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    
    addFavorite: (state, action) => {
      const exists = state.cities.find(city => city.name === action.payload.name);
      if (!exists) {
        state.cities.push(action.payload);
      }
    },
   
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
    
    
    setFavoritesList: (state, action) => {
      state.cities = action.payload; 
    },
  },
});


export const { addFavorite, removeFavorite, setFavoritesList } = favoritesSlice.actions;
export default favoritesSlice.reducer;