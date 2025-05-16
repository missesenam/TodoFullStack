import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch todos from backend
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/todos");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
});

const initialState = {
  listoftodos: [],
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
        state.listoftodos = action.payload; // Corrected assignment
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = todoSlice.actions;

export default todoSlice.reducer;
