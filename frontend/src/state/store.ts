// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./apis/api"; // Adjust the path as necessary
import globalReducer from "../state/globalSlice"; // Import the global slice
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Handle storage for SSR
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"], // Persist only the global state
};

// Combine reducers
const rootReducer = combineReducers({
  global: globalReducer, // Add the global reducer
  [api.reducerPath]: api.reducer, // Add RTK Query's API reducer
});

// Properly type the combined reducer for persistReducer
type RootReducer = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

// Configure the Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware), // Include API middleware
});

// Create a persistor instance
export const persistor = persistStore(store);

// Infer types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
