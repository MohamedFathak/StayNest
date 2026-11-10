
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    getHotels,
    getHotelById,
    createHotel as createHotelAPI,
    updateHotel as updateHotelAPI,
    deleteHotel as deleteHotelAPI,
} from "../../services/hotelService";
const formatHotel = (hotel) => ({
    ...hotel,
    id: Number(hotel.id),
    price: Number(hotel.price),
    image: hotel.image_path
        ? `http://localhost:5000${hotel.image_path}`
        : "",
});
export const fetchHotels = createAsyncThunk(
    "hotels/fetchHotels",
    async (params = {}) => {
        const data = await getHotels(params);

        return {
            hotels: data.hotels.map(formatHotel),
            totalHotels: Number(data.totalHotels),
            currentPage: Number(data.currentPage),
            totalPages: Number(data.totalPages),
        };
    }
);
export const fetchHotelById = createAsyncThunk(
    "hotels/fetchHotelById",
    async (id) => {
        const data = await getHotelById(id);
        return formatHotel(data.hotel);
    }
);
export const addHotelToDatabase = createAsyncThunk(
    "hotels/addHotel",
    async (formData) => {
        const data = await createHotelAPI(formData);
        return formatHotel(data.hotel);
    }
);
export const updateHotelInDatabase = createAsyncThunk(
    "hotels/updateHotel",
    async ({ id, formData }) => {
        const data = await updateHotelAPI(id, formData);
        return formatHotel(data.hotel);
    }
);
export const deleteHotelFromDatabase = createAsyncThunk(
    "hotels/deleteHotel",
    async (id) => {
        await deleteHotelAPI(id);
        return Number(id);
    }
);

const initialState = {
    hotels: [],
    selectedHotel: null,
    loading: false,
    detailLoading: false,
    error: null,
    detailError: null,
    totalHotels: 0,
    currentPage: 1,
    totalPages: 1,
};

const hotelSlice = createSlice({
    name: "hotels",
    initialState,

    reducers: {
        clearHotelError: (state) => {
            state.error = null;
            state.detailError = null;
        },
        clearSelectedHotel: (state) => {
            state.selectedHotel = null;
            state.detailError = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload.hotels;
                state.totalHotels = action.payload.totalHotels;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchHotelById.pending, (state) => {
                state.detailLoading = true;
                state.detailError = null;
            })
            .addCase(fetchHotelById.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.selectedHotel = action.payload;

                const index = state.hotels.findIndex(
                    (hotel) => hotel.id === action.payload.id
                );

                if (index !== -1) {
                    state.hotels[index] = action.payload;
                }
            })
            .addCase(fetchHotelById.rejected, (state, action) => {
                state.detailLoading = false;
                state.detailError = action.error.message;
                state.selectedHotel = null;
            })
            .addCase(addHotelToDatabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHotelToDatabase.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels.unshift(action.payload);
                state.totalHotels += 1;
            })
            .addCase(addHotelToDatabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateHotelInDatabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHotelInDatabase.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.hotels.findIndex(
                    (hotel) => hotel.id === action.payload.id
                );

                if (index !== -1) {
                    state.hotels[index] = action.payload;
                }

                if (state.selectedHotel?.id === action.payload.id) {
                    state.selectedHotel = action.payload;
                }
            })
            .addCase(updateHotelInDatabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteHotelFromDatabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHotelFromDatabase.fulfilled, (state, action) => {
                state.loading = false;

                state.hotels = state.hotels.filter(
                    (hotel) => hotel.id !== action.payload
                );

                if (state.selectedHotel?.id === action.payload) {
                    state.selectedHotel = null;
                }

                state.totalHotels = Math.max(
                    0,
                    state.totalHotels - 1
                );
            })
            .addCase(deleteHotelFromDatabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    clearHotelError,
    clearSelectedHotel,
} = hotelSlice.actions;

export default hotelSlice.reducer;



