import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk(
  "todolist/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      // Add 1 second delay
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get("http://localhost:5000/api/todos", {
        withCredentials: true,
      });

      if (response.data && Array.isArray(response.data.tasks)) {
        return response.data.tasks;
      } else {
        return rejectWithValue("Unexpected response format.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No Tasks available"
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch todos"
        );
      }
    }
  }
);

const initialState = {
  listoftodos: [],
  loading: false,
  error: null, // can store "No Tasks available" here
};

export const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.listoftodos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.listoftodos = []; // clear todos
        state.error = action.payload || action.error.message;
      });
  },
});

export default todoSlice.reducer;
