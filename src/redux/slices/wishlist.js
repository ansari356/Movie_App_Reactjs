import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToWishList: (state, action) => {
      const exists = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.media_type === action.payload.media_type
      );
      if (!exists) {
        state.items.push({ id: action.payload.id, media_type: action.payload.media_type });
        state.count += 1;
      }
    },

    
    removeFromWishList: (state, action) => {
      const filtered = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.media_type === action.payload.media_type
          )
      );
      state.items = filtered;
      state.count = filtered.length;
    },


    
    clearWishList: (state) => {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;