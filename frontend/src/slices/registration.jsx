import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postUser = createAsyncThunk(
  "registration/postUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData,
        { withCredentials: true }
      );
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
      // if (error.response && error.response.data.error) {
      //   // ⚠️ Match the exact key: "error"
      //   return rejectWithValue(error.response.data.error); // <-- This is the array
      // }
      // return rejectWithValue([{ msg: "Something went wrong" }]);
    }
  }
);

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  status: "idle",
  error: null,
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.newUser || {};
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
// export const {} = registrationSlice.actions;

export default registrationSlice.reducer;
