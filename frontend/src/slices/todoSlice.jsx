import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = todoSlice.actions;

export default todoSlice.reducer;
