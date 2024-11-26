"use client";

import React from "react";
import { useGetExpensesQuery } from "@state/apis/api";

const ExpenseList: React.FC = () => {
  const { data: expenses, error, isLoading } = useGetExpensesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const cardClass = "bg-white shadow-md rounded-lg p-6 w-full h-[400px] flex flex-col justify-between";

  if (isLoading)
    return (
      <div className={cardClass}>
        <h1 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">Expenses</h1>
        <p className="text-gray-500 text-sm mt-4">Loading expenses...</p>
      </div>
    );

  if (error)
    return (
      <div className={cardClass}>
        <h1 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">Expenses</h1>
        <p className="text-red-600 text-sm mt-4">
          Error loading expenses: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );

  if (!expenses || expenses.length === 0)
    return (
      <div className={cardClass}>
        <h1 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">Expenses</h1>
        <p className="text-gray-500 text-sm mt-4">No expenses available</p>
      </div>
    );

  return (
    <div className={cardClass}>
      <div>
        <h1 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">Expenses</h1>
        <div className="max-h-[280px] overflow-y-auto">
          <ul className="divide-y divide-gray-300">
            {expenses.map((expense) => (
              <li
                key={expense.expenseSummaryId || `${expense.date}-${expense.totalExpenses}`}
                className="flex justify-between items-center py-2"
              >
                <span className="text-gray-600 text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </span>
                <span className="font-medium text-gray-800">
                  ${expense.totalExpenses?.toFixed(2) ?? "N/A"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center border-t border-gray-300 pt-2 mt-2 text-gray-600 text-sm">
        <span>{expenses.length} entries</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ExpenseList;
