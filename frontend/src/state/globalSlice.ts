import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the GlobalState interface
interface GlobalState {
  sidebarCollapsed: boolean;
  isDarkMode: boolean; // Add the isDarkMode property
}

// Define the initial state
const initialState: GlobalState = {
  sidebarCollapsed: false,
  isDarkMode: false, // Default to light mode
};

// Create the slice
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Toggle sidebar collapsed state
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    // Toggle dark mode state
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// Export actions
export const { setSidebarCollapsed, setDarkMode } = globalSlice.actions;

// Export reducer
export default globalSlice.reducer;
