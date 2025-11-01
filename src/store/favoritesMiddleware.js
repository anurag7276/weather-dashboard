import { setFavoritesList, addFavorite, removeFavorite } from './favoritesSlice';
import { setLogin, setLogout } from './authSlice';


const saveFavoritesToStorage = (userId, favorites) => {
  try {
    const key = `favorites_${userId}`; 
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (e) {
    console.warn('Could not save favorites', e);
  }
};

const loadFavoritesFromStorage = (userId) => {
  try {
    const key = `favorites_${userId}`;
    const serializedFavorites = localStorage.getItem(key);
    if (serializedFavorites === null) return [];
    return JSON.parse(serializedFavorites);
  } catch (e) {
    return [];
  }
};

export const favoritesMiddleware = (store) => (next) => (action) => {
  
  
  const result = next(action);

  
  if (setLogin.match(action)) {

    const userId = action.payload.email; 
    const userFavorites = loadFavoritesFromStorage(userId);
    store.dispatch(setFavoritesList(userFavorites)); 
  }

  
  if (setLogout.match(action)) {

    const guestFavorites = loadFavoritesFromStorage('guest');
    store.dispatch(setFavoritesList(guestFavorites));
  }

 
  if (addFavorite.match(action) || removeFavorite.match(action)) {
    
    const state = store.getState();
    const user = state.auth.user;
    const newFavorites = state.favorites.cities;

    if (user) {
      
      saveFavoritesToStorage(user.email, newFavorites);
    } else {
     
      saveFavoritesToStorage('guest', newFavorites);
    }
  }

  return result;
};