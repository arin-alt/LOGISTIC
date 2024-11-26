"use client";

import React from "react";
import { useGetExpensesQuery } from "@state/apis/api";

const ExpenseList: React.FC = () => {
  const { data: expenses, error, isLoading } = useGetExpensesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading expenses...</p>;
  if (error)
    return (
      <p>
        Error loading expenses:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  if (!expenses || expenses.length === 0) return <p>No expenses available</p>;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-2 bg-white shadow-md rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">Expenses</h2>
        <span className="text-sm text-gray-500">Last updated: 11/26/2024</span>
      </div>

      {/* Expense List */}
      <ul className="overflow-y-auto divide-y divide-gray-200 max-h-72">
        {expenses.map((expense) => (
          <li
            key={expense.expenseSummaryId || `${expense.date}-${expense.totalExpenses}`}
            className="flex justify-between items-center py-2"
          >
            <span className="text-sm text-gray-600">
              {new Date(expense.date).toLocaleDateString()}
            </span>
            <span className="text-sm font-medium text-gray-800">
              ${expense.totalExpenses?.toFixed(2) ?? "N/A"}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-300">
        <span className="text-sm text-gray-500">{expenses.length} entries</span>
        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View All
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
