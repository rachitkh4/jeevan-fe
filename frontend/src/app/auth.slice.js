import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../utils/request";
import { apis } from "../utils/apis";

// Thunk action to perform the login API call
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (credentials) => {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await apiRequest("POST", apis.login, formData, null, {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    });
    return response;
  }
);

// Create the login slice
const authSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetLoginState } = authSlice.actions;

export default authSlice.reducer;
