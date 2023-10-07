// AppointmentFormSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/request";
import { apis } from "../../utils/apis";

export const fetchDoctorList = createAsyncThunk(
  "appointmentForm/fetcDoctorList",
  async (payload) => {
    const response = await apiRequest(
      "GET",
      apis?.listAllDoctors,
      null,
      payload
    );
    return response;
  }
);

const AppointmentFormSlice = createSlice({
  name: "appointmentForm",
  initialState: {
    doctorList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorList = action.payload;
      })
      .addCase(fetchDoctorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default AppointmentFormSlice.reducer;
