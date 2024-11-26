import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all expenses by category
export const getExpensesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json(expenseByCategorySummary);
  } catch (error) {
    console.error("Error fetching expenses by category:", error); // Log for debugging
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};

// Fetch all expense summaries
export const getExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Fetching expenses..."); // Add this log
    const expenses = await prisma.expenseSummary.findMany({
      orderBy: { date: "desc" },
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error retrieving expense summaries." });
  }
};
