import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
        // Add your slices here
        // Example: cart: cartReducer,
    },
});
export default store; 