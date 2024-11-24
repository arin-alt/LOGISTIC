"use client";

import { useAppDispatch, useAppSelector } from "../app/redux"; // Corrected import path
import { setDarkMode, setSidebarCollapsed } from "../state/globalSlice"; // Corrected import path
import { Menu, Moon, Sun } from "lucide-react";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();

  // Selectors for Redux state
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.sidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    dispatch(setSidebarCollapsed(!isSidebarCollapsed));
  };

  // Toggle dark mode state
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      // Switch back to light mode
      htmlElement.classList.remove("dark");
      console.log("Switched to light mode");
    } else {
      // Switch to dark mode
      htmlElement.classList.add("dark");
      console.log("Switched to dark mode");
    }

    // Update Redux state
    dispatch(setDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-4">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
