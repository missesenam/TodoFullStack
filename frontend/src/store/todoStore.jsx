import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import modalReducer from "../slices/modalSlice";
import registrationReducer from "../slices/registration";

export const store = configureStore({
  reducer: {
    todolist: todoReducer,
    modal: modalReducer,
    registration: registrationReducer,
  },
});
