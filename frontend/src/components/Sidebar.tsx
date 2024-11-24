"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "../app/redux"; // Updated import path
import { setSidebarCollapsed } from "../state/globalSlice"; // Updated import path
import {
  Archive,
  Handshake,
  Layout,
  LucideIcon,
  Menu,
  ShoppingBasket,
  SlidersHorizontal,
  SquareUser,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-500 text-white" : "text-gray-700"
        }`}
      >
        <Icon className="w-6 h-6" />
        {!isCollapsed && (
          <span className="font-medium text-gray-700">{label}</span>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector(
    (state) => state.global.sidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setSidebarCollapsed(!sidebarCollapsed)); // Toggle sidebar collapsed state
  };

  const sidebarClassNames = `fixed flex flex-col ${
    sidebarCollapsed ? "w-16" : "w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* Top Section: Logo and Toggle Button */}
      <div
        className={`flex items-center gap-3 justify-between md:justify-start pt-8 ${
          sidebarCollapsed ? "px-4" : "px-8"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
            L
          </div>
          {!sidebarCollapsed && (
            <h1 className="font-extrabold text-xl text-gray-700 ml-3">
              Logistics
            </h1>
          )}
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="flex-grow mt-6">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={sidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Warehouse}
          label="Inventory"
          isCollapsed={sidebarCollapsed}
        />
        <SidebarLink
          href="/vendor"
          icon={Handshake}
          label="Vendor"
          isCollapsed={sidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={SquareUser}
          label="Users"
          isCollapsed={sidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={sidebarCollapsed}
        />
        <SidebarLink
          href="/demand"
          icon={ShoppingBasket}
          label="Demand"
          isCollapsed={sidebarCollapsed}
        />
      </div>

      {/* Footer Section */}
      <div
        className={`mt-auto pb-6 text-center ${
          sidebarCollapsed ? "hidden" : "block"
        }`}
      >
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Inventory Management
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
