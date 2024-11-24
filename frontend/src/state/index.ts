import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  sidebarCollapsed: boolean;
  isDarkMode: boolean; // Consistent naming for dark mode state
}

const initialState: InitialStateTypes = {
  sidebarCollapsed: false,
  isDarkMode: false, // Default to light mode
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload; // Handles toggling between dark and light mode
    },
  },
});

export const { setDarkMode, setSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer;
