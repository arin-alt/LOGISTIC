"use client";

import React from "react";
import ExpenseList from "./Expenselist";

const ExpensesPage: React.FC = () => {
  return (
    <div>
      <h1>Expenses Page</h1>
      <ExpenseList />
    </div>
  );
};

export default ExpensesPage;
