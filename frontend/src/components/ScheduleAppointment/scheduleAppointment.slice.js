// ScheduleAppointmentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRequest } from "../../utils/request";
import { apis } from "../../utils/apis";

// Define the async thunk for fetching data
export const fetchDoctorSlots = createAsyncThunk(
  "list/fetchDoctorSlots",
  async ({ id, payload }) => {
    const response = await apiRequest(
      "GET",
      `${apis?.doctorSlotsDetails}/${id}`,
      null,
      payload
    );
    return response;
  }
);

export const createAppointment = createAsyncThunk(
  "appoinment/createAppointment",
  async (payload) => {
    const response = await apiRequest("POST", apis?.createAppointment, payload);
    return response;
  }
);

// Create the slice
const ScheduleAppointmentSlice = createSlice({
  name: "slots",
  initialState: {
    appointmentRegistered: {},
    appointmentDetails: {},
    doctorSlotDetails: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearDoctorData: (state) => {
      state.doctorSlotDetails = {};
    },
    setAppointmentDetails: (state, action) => {
      state.appointmentDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorSlotDetails = action.payload;
      })
      .addCase(fetchDoctorSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentRegistered = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const ScheduleAppointmentActions = ScheduleAppointmentSlice.actions;
export default ScheduleAppointmentSlice.reducer;
