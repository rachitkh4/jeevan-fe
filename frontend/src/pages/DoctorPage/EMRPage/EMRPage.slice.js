import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../../utils/apis";
import { apiRequest } from "../../../utils/request";
import axios from "axios";

export const searchVitalsDetails = createAsyncThunk(
  "searchVitals/EMR",
  async (params) => {
    const response = await axios.get(apis?.searchVitals, { params });
    return response;
  }
);
export const getEMRId = createAsyncThunk("getPMRId/PMRId", async (payload) => {
  const response = await apiRequest("POST", apis?.createEMR, payload);
  return response;
});

export const postEMR = createAsyncThunk("submitPMR/PMR", async (payload) => {
  const response = await apiRequest("PATCH", apis?.submitEMR, payload);
  return response;
});

export const uploadPmrPdf = createAsyncThunk(
  "uploadPMR/PMR",
  async (pdfBlob, pmr_id, document_type) => {
    const access_token = localStorage.getItem("accesstoken");
    const formData = new FormData();
    formData.append("file", pdfBlob);
    try {
      const response = await axios.post(apis.uploadPmrPdf, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  }
);

const EMRSlice = createSlice({
  name: "SearchVitals",
  initialState: {
    loading: false,
    searchedData: [],
    pmrIdData: {},
    pmr: {},
  },
  reducers: {
    resetSearchData: (state, value) => {
      state.searchedData = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVitalsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchVitalsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedData = action.payload;
      })
      .addCase(searchVitalsDetails.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEMRId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEMRId.fulfilled, (state, action) => {
        state.loading = false;
        state.pmrIdData = action.payload;
      })
      .addCase(getEMRId.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(postEMR.pending, (state) => {
        state.loading = true;
      })
      .addCase(postEMR.fulfilled, (state, action) => {
        state.loading = false;
        state.pmr = action.payload;
      })
      .addCase(postEMR.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default EMRSlice.reducer;
