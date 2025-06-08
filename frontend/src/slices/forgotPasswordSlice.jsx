import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const sendResetEmail = createAsyncThunk(
  "forgotPassword/sendResetEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgotpassword",
        { email }
      );
      toast.success("Reset link sent! Check your email.");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset link.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendResetEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
