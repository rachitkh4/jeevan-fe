// PatientRegistartionSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/request";
import { apis } from "../../utils/apis";

export const registerAADHAR = createAsyncThunk(
  "registration/aadharregisterAADHAR",
  async (userData) => {
    const response = await apiRequest("POST", apis?.registerAadhar, userData);
    return response;
  }
);

export const registerPhone = createAsyncThunk(
  "registration/aadharregisterPhone",
  async ({ payload, url }) => {
    const response = await apiRequest("POST", url, payload);
    return response;
  }
);

export const verifyAadharOTP = createAsyncThunk(
  "registration/verifyAADHAR",
  async (OTP) => {
    const response = await apiRequest("POST", apis?.verifyOTPAadhar, OTP);
    return response;
  }
);
export const verifyPhoneOTP = createAsyncThunk(
  "registration/verifyPhone",
  async (OTP) => {
    const response = await apiRequest("POST", apis?.verifyOTPNumber, OTP);
    return response;
  }
);

export const verifyAadharPhoneOTP = createAsyncThunk(
  "registration/verifyAadharPhone",
  async (OTP) => {
    const response = await apiRequest("POST", apis?.verifyAadharotp, OTP);
    return response;
  }
);

export const registerPatient = createAsyncThunk(
  "registration/registerPatient",
  async ({ payload, url }) => {
    const response = await apiRequest("POST", url, payload);
    return response;
  }
);

const PatientRegistartionSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    registerAadhar: {},
    registerPhone: {},
    registeredPatientDetails: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAADHAR.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAADHAR.fulfilled, (state, action) => {
        state.loading = false;
        state.registerAadhar = action.payload;
      })
      .addCase(registerAADHAR.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.registerPhone = action.payload;
      })
      .addCase(registerPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyAadharOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAadharOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyAadharOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyPhoneOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPhoneOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyPhoneOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredPatientDetails = action.payload;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyAadharPhoneOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAadharPhoneOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyAadharPhoneOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default PatientRegistartionSlice.reducer;
