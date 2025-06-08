import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// slices
import todoReducer from "../slices/todoSlice";
import modalReducer from "../slices/modalSlice";
import registrationReducer from "../slices/registration";
import authReducer from "../slices/LogInSlice";
import forgotPasswordReducer from "../slices/forgotPasswordSlice";

// 1️⃣ Combine all reducers
const rootReducer = combineReducers({
  todolist: todoReducer,
  modal: modalReducer,
  registration: registrationReducer,
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
});

// 2️⃣ Persist config for auth slice only
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice
};

// 3️⃣ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Use persistedReducer in store
export const store = configureStore({
  reducer: persistedReducer,
});

// 5️⃣ Export persistor for PersistGate
export const persistor = persistStore(store);
