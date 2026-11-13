
import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./slices/hotelSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
        auth: authReducer,
    },
});




