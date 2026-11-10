import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./slices/hotelSlice";
export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
    },
});



