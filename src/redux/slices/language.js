import { createSlice } from "@reduxjs/toolkit";
import { saveLanguage,loadLanguage } from "../localStorageHelpers"; // adjust the path if needed

const languageSlice = createSlice({
  name: "language",
  initialState: {
    selectedLanguage: loadLanguage(), // ✅ Load from localStorage
  },
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      saveLanguage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
