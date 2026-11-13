import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/authService";
const getStoredAuth = () => {
    try {
        const token = localStorage.getItem("staynest_token");
        const user = localStorage.getItem("staynest_user");

        if (token && user) {
            return {
                token,
                user: JSON.parse(user),
                isAuthenticated: true,
            };
        }
    } catch (error) {
        localStorage.removeItem("staynest_token");
        localStorage.removeItem("staynest_user");
    }
    return {
        token: null,
        user: null,
        isAuthenticated: false,
    };
};

// Login
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await loginUser(credentials);

            localStorage.setItem("staynest_token", data.token);
            localStorage.setItem(
                "staynest_user",
                JSON.stringify(data.user)
            );

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Register
export const register = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            return await registerUser(userData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const storedAuth = getStoredAuth();

const authSlice = createSlice({
    name: "auth",

    initialState: {
        ...storedAuth,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        clearAuthError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;

