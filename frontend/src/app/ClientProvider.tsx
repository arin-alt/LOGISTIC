"use client"; // Ensures this is treated as a Client Component

import { Provider } from "react-redux";
import { store } from "../state/store"; // Adjust the path if needed
import DashboardWrapper from "./dashboard/dashboardWrapper"; // Adjust the path if needed

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <DashboardWrapper>{children}</DashboardWrapper>
    </Provider>
  );
}
