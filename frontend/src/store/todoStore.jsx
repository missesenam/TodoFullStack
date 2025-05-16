import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import modalReducer from "../slices/modalSlice";

export const store = configureStore({
  reducer: {
    todolist: todoReducer,
    modal: modalReducer,
  },
});
