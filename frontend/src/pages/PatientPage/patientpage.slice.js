// PatientPageSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRequest } from "../../utils/request";
import { apis } from "../../utils/apis";

// Define the async thunk for fetching data
export const fetchPatientList = createAsyncThunk(
  "list/fetchPatientList",
  async (payload) => {
    const response = await apiRequest("GET", apis?.listPtaient, null, payload);
    return response;
  }
);


// Create the slice
const PatientPageSlice = createSlice({
  name: "list",
  initialState: {
    patientList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientList.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = action.payload;
      })
      .addCase(fetchPatientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and reducer
export const { reducer } = PatientPageSlice;
export default PatientPageSlice;
