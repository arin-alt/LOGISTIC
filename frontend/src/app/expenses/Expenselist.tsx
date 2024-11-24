"use client";

import React from "react";
import { useGetExpensesQuery } from "@state/apis/api";

const ExpenseList: React.FC = () => {
  const { data: expenses, error, isLoading } = useGetExpensesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading expenses...</p>;
  if (error)
    return <p>Error loading expenses: {error instanceof Error ? error.message : "Unknown error"}</p>;
  if (!expenses || expenses.length === 0) return <p>No expenses available</p>;

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense: { expenseSummaryId: string; date: string; totalExpenses: number }) => (
          <li key={expense.expenseSummaryId}>
            {new Date(expense.date).toLocaleDateString()}: ${expense.totalExpenses.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
