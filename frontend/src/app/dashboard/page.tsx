"use client";

import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import ExpenseList from "../expenses/Expenselist"; // Correct path to ExpenseList

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      {/* Card components */}
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />

      {/* Add ExpenseList */}
      <div className="md:row-span-1 xl:row-span-2 bg-white p-4 rounded shadow">
        <ExpenseList />
      </div>
    </div>
  );
};

export default Dashboard;
