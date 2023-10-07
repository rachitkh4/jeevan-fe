// hospitalSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../utils/apis";
import { apiRequest } from "../../utils/request";

export const fetchHospital = createAsyncThunk(
  "hospital/fetchHospital",
  async () => {
    const response = await apiRequest("GET", apis?.list);
    return response;
  }
);

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    hospitalsData: null,
    loading: false,
    error: null,
    selectedHospital: {},
  },
  reducers: {
    setSelectedHospital: (state, value) => {
      state.selectedHospital = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalsData = action.payload;
      })
      .addCase(fetchHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hospitalSlice.reducer;
