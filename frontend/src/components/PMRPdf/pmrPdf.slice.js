import { toBlob } from "@react-pdf/renderer";
import axios from "axios";
import { apis } from "../../utils/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, pdfUploadHeader } from "../../utils/request";

// Assuming you have the PdfDocument component defined

export const submitPdf = createAsyncThunk(
  "submitEMR/EMR",
  async ({ blob, pdfPayload }) => {
    const pdfBlob = blob;
    const apiUrl = apis.uploadPmrPdf;

    const chunkSize = 5 * 1024 * 1024; // 5 MB
    const totalChunks = Math.ceil(pdfBlob.size / chunkSize);

    for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
      const start = chunkNumber * chunkSize;
      const end = Math.min(start + chunkSize, pdfBlob.size);
      const chunk = pdfBlob.slice(start, end);

      const formData = new FormData();
      formData.append("file", chunk, "document.pdf");
      console.log(pdfPayload);
      try {
        const response = await axios.post(BASE_URL + "/" + apiUrl, formData, {
          params: {
            document_type: pdfPayload?.document_type,
            pmr_id: pdfPayload?.pmr_id,
          },
          headers: pdfUploadHeader(),
        });

        console.log("Chunk uploaded:", response.data);
        return response;
      } catch (error) {
        console.error("Error uploading chunk:", error);
      }
    }
  }
);

const EMRPdfSlice = createSlice({
  name: "SubmitPdf",
  initialState: {
    dataPdf: {},
    loading: false,
  },
  reducers: {
    resetSearchData: (state, value) => {
      state.searchedData = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPdf.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitPdf.fulfilled, (state, action) => {
        state.loading = false;
        state.dataPdf = action.payload;
      })
      .addCase(submitPdf.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default EMRPdfSlice.reducer;

// Assuming you have the PdfDocument component defined
