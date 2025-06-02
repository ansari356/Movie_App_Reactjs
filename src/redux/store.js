import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from './slices/wishlist';
import { loadWishlist, saveWishlist } from "./localStorageHelpers";
import languageReducer from "./slices/language";
const persistedWishlist = loadWishlist();
const store = configureStore({
    reducer: {
        wishlist : wishlistReducer,
        language: languageReducer,
    },
  preloadedState: {
    wishlist: persistedWishlist || undefined,
  },
});
store.subscribe(() => {
  const state = store.getState();
  saveWishlist(state.wishlist);
});
export default store; 